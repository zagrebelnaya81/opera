<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;

class StoreEbooks extends FormRequest
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
        'title_ru' => 'required',
        'title_en' => 'required',
        'title_ua' => 'required',
        'file_en' => 'nullable|mimes:pdf',
        'file_ru' => 'nullable|mimes:pdf',
        'file_ua' => 'nullable|mimes:pdf',
      ];
    }
  public function messages()
  {
    return [
      'title_ru.required' => Lang::get('errors.titleRuRequired'),
      'title_en.required' => Lang::get('errors.titleEnRequired'),
      'title_ua.required' => Lang::get('errors.titleUaRequired'),
    ];
  }
}
