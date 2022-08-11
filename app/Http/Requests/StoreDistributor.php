<?php

namespace App\Http\Requests;

use App\Models\Distributor;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDistributor extends FormRequest
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
        $ignoreUser = $this->distributor->user ?? null;

        return [
            'title' => 'required|max:200',
            'email' => [
                'required',
                'email',
                'max: 255',
                Rule::unique('distributors', 'email')->ignore($this->distributor),
                Rule::unique('users', 'email')->ignore($ignoreUser)
            ],
            'phone' => 'required|max:200',
            'color_code' => 'required|max:100',
            'is_active' => 'integer|max:1',
            'type' => [
                Rule::in([
                    Distributor::INDIVIDUAL_ENTREPRENEUR,
                    Distributor::REMOTE_CASH_BOX,
                    Distributor::COMPANY
                ])
            ],
        ];
    }
}
