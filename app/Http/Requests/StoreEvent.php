<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEvent extends FormRequest
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
            'poster' => [
                'nullable',
                'image',
            ],
            'poster_2' => [
                'nullable',
                'image',
            ],
            'date' => [
                'required',
                'date',
            ],
            'actors' => [
                'nullable',
                'array',
            ],
            'actors.*.actor_id' => [
                'required',
                'numeric',
                'exists:actors,id',
            ],
            'actors.*.actor_role_id' => [
                'required',
                'numeric',
                'exists:actor_roles,id',
            ],
        ];
    }
}
