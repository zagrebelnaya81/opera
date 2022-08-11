<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;

class StoreActor extends FormRequest
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
            'firstName_ru' => 'required|max:50',
            'firstName_en' => 'required|max:50',
            'firstName_ua' => 'required|max:50',
            'patronymic_en' => 'nullable|max:70',
            'patronymic_ru' => 'nullable|max:70',
            'patronymic_ua' => 'nullable|max:70',
            'lastName_ru' => 'required|max:50',
            'lastName_en' => 'required|max:50',
            'lastName_ua' => 'required|max:50',
            'descriptions_en' => 'required',
            'descriptions_ru' => 'required',
            'descriptions_ua' => 'required',
            'group_id' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'firstName_ru.required' => Lang::get('errors.firstNameRuRequired'),
            'firstName_en.required' => Lang::get('errors.firstNameEnRequired'),
            'firstName_ua.required' => Lang::get('errors.firstNameUaRequired'),
            'lastName_ru.required' => Lang::get('errors.lastNameRuRequired'),
            'lastName_en.required' => Lang::get('errors.lastNameEnRequired'),
            'lastName_ua.required' => Lang::get('errors.lastNameUaRequired'),
            'descriptions_en.required' => Lang::get('errors.descriptionsEnRequired'),
            'descriptions_ru.required' => Lang::get('errors.descriptionsRuRequired'),
            'descriptions_ua.required' => Lang::get('errors.descriptionsUaRequired'),
            'group_id.required' => Lang::get('errors.groupIdRequired'),
        ];
    }
}
