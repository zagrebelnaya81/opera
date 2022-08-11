<?php

namespace App\Repositories;


use App\Models\User;
use Illuminate\Support\Str;

class UserRepository extends Repository
{
	/**
	 * Specify Model class name
	 *
	 * @return mixed
	 */
	function model()
	{
		return User::class;
	}

	public function createUser($data, $roleName = 'user')
	{
		$user = [
			'login' => $data['email'],
			'email' => $data['email'],
			'password' => bcrypt($data['password']),
			'firstName' => $data['firstName'],
			'lastName' => $data['lastName'],
			'phone' => $data['phone'],
			'country_id' => $data['country_id'] ?? null,
			'city' => $data['city'] ?? null,
			'street' => $data['street'] ?? null,
			'houseNumber' => $data['houseNumber'] ?? null
		];
		$user = $this->create($user);
        $user->assignRole($roleName);

		return $user;
	}

	public function editUser($data, $user) {
        $data['login'] = $data['login'] ?? $data['email'];

        if(isset($data['password'])) {
            if(\Hash::check($data['password'], $user->password)) {
                $array['password'] = bcrypt($data['password_new']);
            }
            else {
                return 'incorrect_password';
            }
        }

		$this->update($data, ['id' => $user->id]);

		return true;
	}
}
