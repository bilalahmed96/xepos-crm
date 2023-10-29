<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Mail\CompanyAdded;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::paginate(10); // 10 companies per page

        return response()->json(['message' => 'Companies fetched successfully', 'companies' => $companies], 200);
    }

    /**
     * Display a listing of all the companies.
     *
     * @return \Illuminate\Http\Response
     */
    public function allCompanies()
    {
        $companies = Company::all();
        return response()->json(['companies' => $companies], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCompanyRequest $request)
    {
        $validatedData = $request->validated();

        // Handle the logo file
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $this->storeLogo($request->file('logo'));
        }

        // creating company
        $company = Company::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'logo' => $logoPath,
            'website' => $validatedData['website'],
        ]);

        // sending Mail
        Mail::to('admin@admin.com')->send(new CompanyAdded($company));

        // returning response
        return response()->json(['message' => 'Company created successfully', 'company' => $company], 201);
    }

    /**
     * Save the logo in storage.
     *
     * @param  file $file
     * @return \Illuminate\Http\file
     */
    private function storeLogo(UploadedFile $file)
    {
        // Generate a unique filename for the logo
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();

        // Store the logo in the public directory
        $path = $file->storeAs('public/logos', $filename);

        // Generate the URL to the stored logo
        return asset(str_replace('public', 'storage', $path));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        // returing a single company resource
        return response()->json(['company' => $company], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        $validatedData = $request->validated();

        // Check if a new logo file is provided in the update request
        if ($request->hasFile('logo')) {
            // Delete the old logo from storage
            if ($company->logo) {
                Storage::delete($company->logo);
            }
            $logoPath = $this->storeLogo($request->file('logo'));
        } else {
            $logoPath = $company->logo;
        }

        // Update company details
        $company->name = $validatedData['name'];
        $company->email = $validatedData['email'];
        $company->website = $validatedData['website'];
        $company->logo = $logoPath;
        $company->save();

        // Return a response
        return response()->json(['message' => 'Company updated successfully', 'company' => $company], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        $company->delete();

        return response()->json(['message' => 'Company deleted successfully'], 200);
    }
}
