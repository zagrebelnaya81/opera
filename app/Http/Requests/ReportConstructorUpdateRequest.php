<?php

namespace App\Http\Requests;

use App\Models\ReportConstructor;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReportConstructorUpdateRequest extends FormRequest
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
            ReportConstructor::FIELD_TITLE => ['max:255'],
            ReportConstructor::FIELD_DISTRIBUTOR => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_EVENT => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_DATE => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_TIME => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_DISCOUNT => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_PRICE => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_RESERVATION => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_QUANTITY_DISCOUNT => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_QUANTITY_NO_DISCOUNT => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_QUANTITY_CASH => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_QUANTITY_CASHLESS => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_QUANTITY_ONLINE => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_QUANTITY_ALL => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_AMOUNT_DISCOUNT => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_AMOUNT_NO_DISCOUNT => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_AMOUNT_CASH => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_AMOUNT_CASHLESS => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_AMOUNT_ONLINE => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_AMOUNT_ALL => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_ROLE_ADMIN => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_ROLE_SENIOR_CASHIER => ['integer', Rule::in([0, 1])],
            ReportConstructor::FIELD_ROLE_CASHIER => ['integer', Rule::in([0, 1])],
        ];
    }
}
