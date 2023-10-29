<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'email|nullable',
            'logo' => ['nullable', 'image', 'dimensions:min_width=100,min_height=100'],
            'website' => 'nullable|url',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'error' => 'Validation failed',
            'message' => $validator->errors(),
        ], 422);

        throw new HttpResponseException($response);
    }
}
