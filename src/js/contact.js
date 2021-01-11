require('jquery-jpostal-ja');
require('../../vendor/validate/jquery.validate.min.js');
require('../../vendor/validate/localization/messages_ja.js');
export default function contact() {
    /*
     * 問い合わせフォーム
     */
    if ($('#contactForm').length) {
        $('#contactForm').validate({
            errorElement: 'p',
            errorClass: 'help-block',
            groups: {
                name: "姓 名",
            },
            errorPlacement: function(error, element) {
                if (element.attr("name") == "姓" || element.attr("name") == "名") {
                    error.insertAfter("#error-name");
                } else if (element.attr("name") == "doui" ) {
                    error.insertAfter("#error-doui");
                } else {
                    error.insertAfter(element);
                }
            },
        });
    }

}

