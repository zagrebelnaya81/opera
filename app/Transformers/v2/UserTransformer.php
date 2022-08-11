<?php

namespace App\Transformers\v2;

use App\Models\OrderStatus;
use App\Models\Ticket;
use App\Models\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    public function transform(User $user) {
        return [
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
        ];
    }
}
