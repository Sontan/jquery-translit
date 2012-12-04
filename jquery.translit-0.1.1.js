/**
 * jQuery Translit Plugin
 * By: Vadim Borodean
 * Version: 0.1.1
 *
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details.
 */

/*global jQuery */

(function ($) {

    'use strict';

    var dictionary, events, methods;

    dictionary = {
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'e',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'i',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'kh',
        'ц': 'tc',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'shch',
        'ъ': '',
        'ы': 'y',
        'ь': '',
        'э': 'e',
        'ю': 'iu',
        'я': 'ia'
    };

    events = 'input.translit keyup.translit propertychange.translit';

    methods = {
        init: function () {
            return this.each(function () {
                $(this).val(methods.exec($(this).val()));
            });
        },
        exec: function (string) {
            return string.replace(/([а-яё])/gi, function (matchResult) {
                var matchResultLowerCase, replaceValue;
                matchResultLowerCase = matchResult.toLowerCase();
                replaceValue = dictionary[matchResultLowerCase];
                if (typeof replaceValue === 'undefined') {
                    return matchResult;
                }
                if (matchResultLowerCase === matchResult) {
                    return replaceValue;
                }
                return replaceValue.substring(0, 1).toUpperCase() +
                       replaceValue.substring(1);
            });
        },
        receive: function (sender) {
            $(this).val(methods.exec($(sender).val()));
        },
        send: function (receiver) {
            $(receiver).val(methods.exec($(this).val()));
        },
        watch: function (sender, unwatchOnChange) {
            return this.each(function () {
                var data, that;
                data = $(this).data('senders');
                that = this;
                $(this).data('senders', $(data).add(sender));
                $(sender).on(events, function (e) {
                    $(this).translit('send', that);
                });
                if (unwatchOnChange) {
                    $(this).one('change.translit', function (e) {
                        $(this).translit('unwatch');
                    });
                }
            });
        },
        unwatch: function () {
            return this.each(function () {
                $($(this).data('senders')).off(events);
                $(this).removeData('senders');
            });
        }
    };

    $.fn.translit = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        $.error('Method ' + method + ' does not exist on jQuery.translit');
    };

}(jQuery));
