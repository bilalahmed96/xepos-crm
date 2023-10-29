<?php

namespace App\Mail;

use App\Models\Company;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CompanyAdded extends Mailable
{
    use Queueable, SerializesModels;

    public $company; // Public property to hold the company data

    /**
     * Create a new message instance.
     *
     * @param Company $company // Pass the company data as an argument
     */
    public function __construct(Company $company)
    {
        $this->company = $company; // Assign the company data to the public property
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Company Added')
            ->view('emails.companyAdded')
            ->with(['company' => $this->company]);
    }
}
