<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use Spatie\MediaLibrary\Models\Media;

class MediaTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Media $media)
    {
        return [
            'id' => $media->id,
            'title' => $media->name,
            'preview' => $media->getUrl('preview'),
            'poster' => $media->getUrl(),
        ];
    }
}
