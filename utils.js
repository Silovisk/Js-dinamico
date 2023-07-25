const _token = $("input[name=_token]").val();

const swalBootstrap = Swal.mixin({
    customClass: {
        actions: "justify-content-end w-90",
        confirmButton: "btn btn-primary ml-2",
        cancelButton: "btn btn-dark",
    },
    reverseButtons: true,
    buttonsStyling: false,
});

const SPMaskBehavior = function (val) {
    return val.replace(/\D/g, "").length <= 11
        ? "000.000.000-009999"
        : "00.000.000/0000-00";
},
    spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        },
    };

const SPMaskBehaviorPhone = function (val) {
    return val.replace(/\D/g, "").length === 11
        ? "(00) 0 0000-0000"
        : "(00) 0000-00009";
},
    spOptionsPhone = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehaviorPhone.apply({}, arguments), options);
        },
    };

const Utils = {
    init: () => {
        Utils.setGlobalConfig();
    },
    setGlobalConfig: () => {
        $(".global-form").submit(() => {
            Utils.setFormsInProcessingMode();
        });

        $(window).on("load", function () {
            $("#is-loading").delay(350);
        });

        $(".toggle-right-bar").click(() => {
            $("body").toggleClass("right-bar-enabled");
        });

        $(".title-case").each((i, el) => {
            $(el).keyup(() => {
                $(el).val(Utils.formatProperPersonName($(el).val()));
            });
        });


        /**
             * Exemplo de uso:
             * <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="add-custom-comission-offer" name="add-custom-comission-offer">
                    <label class="custom-control-label" for="add-custom-comission-offer" data-text-checked="Sim" data-text-nochecked="Não" data-target-active="true">Não</label>
                </div>
                <div class="element-to-activate" for="add-custom-comission-offer" style="display: none;">
                    <div class="form-group">
                        <label for="price-offer">Porcentagem comissão</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">%</span>
                            </div>
                        <input type="text" class="form-control percentage" id="add-custom-comission-offer" name="custom-comission" disabled>
                        </div>
                    </div>    
                </div>
            */

        $("body").on("change", ".custom-control-input", function () {
            const idThis = $(this).attr("id");
            const isChecked = $(this).prop("checked");
            const label = $(`label[for='${idThis}'].custom-control-label`);
            const elementToActivate = $(`.element-to-activate[for='${idThis}']`);

            let textChecked = label.data("text-checked");
            let textNoChecked = label.data("text-nochecked");

            if (textChecked && textNoChecked) {
                label.text(isChecked ? textChecked : textNoChecked);
            }
            if (elementToActivate) {
                elementToActivate[isChecked ? "fadeIn" : "fadeOut"](500)
                    .find("input, select, textarea")
                    .prop("disabled", !isChecked);
            }
        });

        
    },
    setFormsInProcessingMode: () => {
        $(".submit").html(
            `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
        );
        $(".submit").prop("disabled", true);
    },

    formatProperUsername: (str) => {
        return _.deburr(str.replaceAll(" ", "").toLowerCase());
    },

    formatProperPersonName: (text) => {
        text = text.toLowerCase();
        let preps = [
            " De ",
            " Da ",
            " Do ",
            " Dos ",
            " E ",
            " O ",
            " Em ",
            " Ou ",
            " Os ",
            " Das ",
        ];
        text = text.replace(/(^|\s)\S/g, function (t) {
            return t.toUpperCase();
        });
        let capitalizedText = text;
        preps.map((prep) => {
            capitalizedText = capitalizedText.replaceAll(prep, prep.toLowerCase());
        });
        return capitalizedText;
    },

    showPassword(el_id, btn_id) {
        let typeIsPassword = $(`#${el_id}`).prop("type") == "password";
        if (typeIsPassword) {
            $(`#${el_id}`).prop("type", "text");
            $(`#${btn_id}`).html(`<i class="uil uil-eye-slash font-size-16"></i>`);
            return false;
        }

        //password is already text. set its type to password again
        $(`#${el_id}`).prop("type", "password");
        $(`#${btn_id}`).html(`<i class="uil uil-eye font-size-16"></i>`);
    },

    redirect: (to) => {
        window.location.href = to;
    },

    bytesToKBytes: (bytes = 0) => {
        return (bytes / 1024).toFixed(2).toString() + "KB";
    },

    getAddress: async (zipcode) => {
        const result = {
            error: false,
            data: null,
        };
        await fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
            .then(async (data) => {
                let response = await data.json();
                result.data = response.erro ? null : response;
            })
            .catch((error) => {
                result.error = error;
            });

        return result;
    },
    uuid: () => {
        let dt = new Date().getTime();
        let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                var r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
            }
        );
        return uuid;
    },
    removeElement: (elId) => {
        $(elId).remove();
    },
    setupPagination: (data) => {
        const links = Utils.sanitizeLinks(data.data);

        $("#pagination").html(`
        <nav aria-label="Page navigation example">
           <ul class="pagination">
              ${links
                .map((link) =>
                    `
                 <li style="cursor: pointer" class="page-item ${link.active ? "active" : ""
                        } ${link.page ? "" : "disabled"}">
                    <a class="page-link" ${link.page ? "" : "disabled"
                        } onclick="${data.get}({page: ${link.page}})">${link.label
                        }</a>
                 </li>
              `.trim()
                )
                .join("")}
           </ul>
        </nav>
        
        `);
    },
    sanitizeLinks: (data) => {
        let sanitezedLinks = [];
        sanitezedLinks.push({
            active: false,
            page: data.first_page_url ? data.first_page_url.split("page=")[1] : null,
            label: "Primeira",
        });
        data.links.map((value, i) => {
            if (i == 0) {
                value.label = "&laquo;";
            }
            if (i == data.links.length - 1) {
                value.label = "&raquo;";
            }
            let page = value.url ? value.url.split("page=")[1] : null;
            sanitezedLinks.push({
                active: value.active,
                page: page,
                label: value.label,
            });
        });

        sanitezedLinks.push({
            active: false,
            page: data.last_page_url ? data.last_page_url.split("page=")[1] : null,
            label: "Última",
        });
        return sanitezedLinks;
    },
    isLoading: (show = true) => {
        if (show) {
            $("#is-loading").css({ display: "flex", zIndex: "10000" });
            return false;
        }
        $("#is-loading").css({ display: "none", zIndex: "unset" });
    },
    fileToBase64: (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        }),

    mascaraMoeda(campo, evento) {
        var valor = campo.value
            .replace(/[^\d]+/gi, "")
            .split("")
            .reverse()
            .join("");
        var resultado = "";
        var mascara = "##.###.###,##".split("").reverse().join("");
        for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
            if (mascara.charAt(x) != "#") {
                resultado += mascara.charAt(x);
                x++;
            } else {
                resultado += valor.charAt(y);
                y++;
                x++;
            }
        }
        campo.value = resultado.split("").reverse().join("");
    },

    copyToCLipboard(element, event = null, title = "Link copiado!") {
        if (event) {
            event.preventDefault();
        }

        // O atributo data-link deve conter o valor a ser copiado
        const copyText = $(element).attr("data-link");
        navigator.clipboard.writeText(copyText);

        swalBootstrap.fire({
            position: "bottom-end",
            icon: "success",
            title: title,
            html: `<b>${copyText}</b>`,
            showConfirmButton: false,
            timerProgressBar: true,
            showCloseButton: true,
            timer: 2000,
            toast: true,
        });

        return false;
    },
};

Utils.init();
