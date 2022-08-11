<?php

namespace App\Transformers;

use App\Models\ActorRole;
use League\Fractal\TransformerAbstract;


class ActorRoleTransformer extends TransformerAbstract
{

    public function transform(ActorRole $actorRole)
    {
        return [
            'id' => $actorRole->id,
            'title' => $actorRole->translate->title,
        ];
    }

}
