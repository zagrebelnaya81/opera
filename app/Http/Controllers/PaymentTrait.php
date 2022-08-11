<?php
/**
 * Created by PhpStorm.
 * User: Rise
 * Date: 2/25/2019
 * Time: 3:25 PM
 */

namespace App\Http\Controllers;


use App\Models\LiqPay;

trait PaymentTrait
{
    protected function formDataForPayment() {
        $language = session('lang');
        $publicKey = env('LIQ_PAY_PUBLIC_KEY');
        $privateKey = env('LIQ_PAY_PRIVATE_KEY');

        $liqPay = new LiqPay($publicKey, $privateKey);
        $liqPayParams = $liqPay->cnb_form(array(
            'action'         => 'paydonate',
            'amount'         => '',
            'currency'       => 'UAH',
            'description'    => 'Пожертва, ресурс - ' . url()->current(),
            'server_url'     => route('api.v1.donations.update'),
            'result_url'     => url()->current(),
            'language'       => $language,
            'version'        => '3',
            'sandbox'        => env('LIQ_PAY_SANDBOX')
        ));

        return $liqPayParams;
    }
}