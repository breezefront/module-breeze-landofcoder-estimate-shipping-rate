define(["jquery"], function($) {
    "use strict";

    var result = function () {
        let s = $("#btn-estimate-shipping"),
            i = $("#lof_product_id").val();

        s.on("click", function() {
            let s = $(".lof-shipping-estimate").find("#shipping-estimate-results"),
                t = $("#lof-postcode"),
                n = t.val();

            s.hide(), void 0 !== n && $.isNumeric(n) && 8 === n.length ? (t.removeClass("has-error"), $.ajax({
                method: 'post',
                dataType: 'json',
                url: BASE_URL + "lofestimateshipping/product/estimate/",
                data: "cep=" + n + "&product=" + i + "&qty=1",
                showLoader: !0,
                success: function(i) {
                    i.error ? s.html("<li>" + i.error.message + "</li>").show() : _.each(i, function(num, key) {
                        let n = $('<li><span class="title">' + key + '</span></li>');
                        if (num.length > 0) {
                            var a = $('<ul></ul>');
                            _.each(num, function(s) {
                                let i = $('<li><span class="title">' + s.title + '</span>  ' + s.price + '</li>');
                                '' != s.message && i.append('- ' + s.message), a.append(i)
                            })
                        }
                        n.append(a), s.empty().append(n).show()
                    })
                }
            })) : t.focus().addClass("has-error")
        });
    };

    $(document).on('breeze:mount:Lof_EstimateShippingRate/js/shipping', () => {
        result();
    });

    return result;
});
