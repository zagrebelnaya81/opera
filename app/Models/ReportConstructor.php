<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportConstructor extends Model {

    protected $hidden = [];

    protected $table = 'report_constructor';

    const FIELD_TITLE = 'title';
    const FIELD_CASHIER = 'cashier';
    const FIELD_DISTRIBUTOR = 'distributor';
    const FIELD_EVENT = 'event';
    const FIELD_DATE = 'date';
    const FIELD_TIME = 'time';
    const FIELD_HALL = 'hall';
    const FIELD_DISCOUNT = 'discount';
    const FIELD_PRICE = 'price';
    const FIELD_RESERVATION = 'reservation';
    const FIELD_QUANTITY_DISCOUNT = 'quantity_discount';
    const FIELD_QUANTITY_NO_DISCOUNT = 'quantity_no_discount';
    const FIELD_QUANTITY_CASH = 'quantity_cash';
    const FIELD_QUANTITY_CASHLESS = 'quantity_cashless';
    const FIELD_QUANTITY_ONLINE = 'quantity_online';
    const FIELD_QUANTITY_ALL = 'quantity_all';
    const FIELD_AMOUNT_DISCOUNT = 'amount_discount';
    const FIELD_AMOUNT_NO_DISCOUNT = 'amount_no_discount';
    const FIELD_AMOUNT_CASH = 'amount_cash';
    const FIELD_AMOUNT_CASHLESS = 'amount_cashless';
    const FIELD_AMOUNT_ONLINE = 'amount_online';
    const FIELD_AMOUNT_ALL = 'amount_all';
    const FIELD_ROLE_ADMIN = 'role_admin';
    const FIELD_ROLE_SENIOR_CASHIER = 'role_senior_cashier';
    const FIELD_ROLE_CASHIER = 'role_cashier';

    const FIELDS = [
        self::FIELD_TITLE,
        self::FIELD_CASHIER,
        self::FIELD_DISTRIBUTOR,
        self::FIELD_EVENT,
        self::FIELD_DATE,
        self::FIELD_TIME,
        self::FIELD_HALL,
        self::FIELD_DISCOUNT,
        self::FIELD_PRICE,
        self::FIELD_RESERVATION,
        self::FIELD_QUANTITY_DISCOUNT,
        self::FIELD_QUANTITY_NO_DISCOUNT,
        self::FIELD_QUANTITY_CASH,
        self::FIELD_QUANTITY_CASHLESS,
        self::FIELD_QUANTITY_ONLINE,
        self::FIELD_QUANTITY_ALL,
        self::FIELD_AMOUNT_DISCOUNT,
        self::FIELD_AMOUNT_NO_DISCOUNT,
        self::FIELD_AMOUNT_CASH,
        self::FIELD_AMOUNT_CASHLESS,
        self::FIELD_AMOUNT_ONLINE,
        self::FIELD_AMOUNT_ALL,
        self::FIELD_ROLE_ADMIN,
        self::FIELD_ROLE_SENIOR_CASHIER,
        self::FIELD_ROLE_CASHIER
    ];

    protected $fillable = [
        self::FIELD_TITLE,
        self::FIELD_CASHIER,
        self::FIELD_DISTRIBUTOR,
        self::FIELD_EVENT,
        self::FIELD_DATE,
        self::FIELD_TIME,
        self::FIELD_HALL,
        self::FIELD_DISCOUNT,
        self::FIELD_PRICE,
        self::FIELD_RESERVATION,
        self::FIELD_QUANTITY_DISCOUNT,
        self::FIELD_QUANTITY_NO_DISCOUNT,
        self::FIELD_QUANTITY_CASH,
        self::FIELD_QUANTITY_CASHLESS,
        self::FIELD_QUANTITY_ONLINE,
        self::FIELD_QUANTITY_ALL,
        self::FIELD_AMOUNT_DISCOUNT,
        self::FIELD_AMOUNT_NO_DISCOUNT,
        self::FIELD_AMOUNT_CASH,
        self::FIELD_AMOUNT_CASHLESS,
        self::FIELD_AMOUNT_ONLINE,
        self::FIELD_AMOUNT_ALL,
        self::FIELD_ROLE_ADMIN,
        self::FIELD_ROLE_SENIOR_CASHIER,
        self::FIELD_ROLE_CASHIER
    ];


}
