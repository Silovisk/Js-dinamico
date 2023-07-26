const deletedPixelIds = [];
class PixelComponent {

    constructor(pixel, api, sendTicket, sendPix, sendCard, idPixel, whatever) {
        this.pixel = pixel;
        this.api = api;
        this.sendTicket = sendTicket;
        this.sendPix = sendPix;
        this.sendCard = sendCard;
        this.idPixel = idPixel;
        this.whatever = whatever;
    }

    get getpixel() {
        return this.pixel;
    }
    set setpixel(value) {
        this.pixel = value;
    }

    get getapi() {
        return this.api;
    }
    set setapi(value) {
        this.api = value;
    }

    get getsendTicket() {
        return this.sendTicket;
    }
    set setsendTicket(value) {
        this.sendTicket = value;
    }

    get getsendPix() {
        return this.sendPix;
    }
    set setsendPix(value) {
        this.sendPix = value;
    }

    get getsendCard() {
        return this.sendCard;
    }
    set setsendCard(value) {
        this.sendCard = value;
    }

    get getidPixel() {
        return this.idPixel;
    }
    set setidPixel(value) {
        this.idPixel = value;
    }

    get getwhatever() {
        return this.whatever;
    }
    set setwhatever(value) {
        this.whatever = value;
    }

    createPixelInput(labelText, placeholderText, pixelId, $formRow, InputAttrName, InputAttrNameHidden) {
        $("<div>")
            .addClass("col-md-6 form-group")
            .append($("<label>").text(labelText))
            .append(
                $("<input>")
                    .attr("type", "text")
                    .addClass("form-control")
                    .attr("name", InputAttrName)
                    .attr("id", pixelId)
                    .val(this.pixel)
                    .attr("placeholder", placeholderText)
            )
            .append(
                $("<input>")
                    .attr("type", "hidden")
                    .attr("name", InputAttrNameHidden)
                    .val(this.idPixel)
            )
            .appendTo($formRow);
    }

    createPixelCheckbox($cardBody) {

        const $formGroup = $("<div>")
            .addClass("form-group mt-3")
            .appendTo($cardBody);

        const $formRow = $("<div>").addClass("form-row").appendTo($cardBody);

        const InputCheckboxTicket = `pixel-checkbox-ticket-${this.idPixel}`;
        const InputCheckboxPix = `pixel-checkbox-pix-${this.idPixel}`;
        const InputCheckboxCard = `pixel-checkbox-card-${this.idPixel}`;

        $("<div>")
            .addClass("form-group mt-3")
            .appendTo($formGroup);
        $("<label>")
            .text('Disparar evento "Purchase" para quais formas de pagamento')
            .appendTo($formRow);

        const $dFlex = $("<div>").addClass("d-flex").appendTo($formRow);

        $("<div>")
            .addClass("custom-control col custom-switch")
            .append(
                $("<input>")
                    .attr("type", "checkbox")
                    .addClass("custom-control-input")
                    .attr("id", InputCheckboxTicket)
                    .attr("name", "sendTicket")
                    .prop("checked", this.sendTicket)
            )
            .append(
                $("<label>")
                    .addClass("custom-control-label")
                    .attr("for", InputCheckboxTicket)
                    .text("Boleto")
            )
            .appendTo($dFlex);
        $("<div>")
            .addClass("custom-control col custom-switch")
            .append(
                $("<input>")
                    .attr("type", "checkbox")
                    .addClass("custom-control-input")
                    .attr("id", InputCheckboxPix)
                    .attr("name", "sendPix")
                    .prop("checked", this.sendPix)
            )
            .append(
                $("<label>")
                    .addClass("custom-control-label")
                    .attr("for", InputCheckboxPix)
                    .text("Pix")
            )
            .appendTo($dFlex);
        $("<div>")
            .addClass("custom-control col custom-switch")
            .append(
                $("<input>")
                    .attr("type", "checkbox")
                    .addClass("custom-control-input")
                    .attr("id", InputCheckboxCard)
                    .attr("name", "sendCard")
                    .prop("checked", this.sendCard)
            )
            .append(
                $("<label>")
                    .addClass("custom-control-label")
                    .attr("for", InputCheckboxCard)
                    .text("Cartão")
            )
            .appendTo($dFlex);
    }

    createPixelInputPercentage($cardBody) {

        const $formGroup2 = $("<div>")
            .addClass("form-group mt-3")
            .appendTo($cardBody);

        const $formRow2 = $("<div>").addClass("form-row").appendTo($cardBody);

        const InputTicketPercentage = `pixel-percentage-ticket-${this.idPixel}`;
        const InputPixPercentage = `pixel-percentage-pix-${this.idPixel}`;
        const InputCardPercentage = `pixel-percentage-card-${this.idPixel}`;


        $("<div>")
            .addClass("col-md-4 form-group")
            .appendTo($formGroup2)
        $("<label>")
            .text("Valor de conversão personalizado para (%)")
            .appendTo($formRow2);


        const $dlfex2 = $("<div>").addClass("d-flex").appendTo($formRow2);

        $("<div>")
            .addClass("col-md-4 form-group")
            .append($("<small>").text("Boleto"))
            .append(
                $("<input>")
                    .attr("type", "text")
                    .addClass("form-control")
                    .attr("id", InputTicketPercentage)
                    .attr("name", "boleto[]")
                    .attr("placeholder", "0,00%")
                    .val("0,00%")
            )
            .appendTo($dlfex2);
        $("<div>")
            .addClass("col-md-4 form-group")
            .append($("<small>").text("Pix"))
            .append(
                $("<input>")
                    .attr("type", "text")
                    .addClass("form-control")
                    .attr("id", InputPixPercentage)
                    .attr("name", "pix[]")
                    .attr("placeholder", "0,00%")
                    .val("0,00%")
            )
            .appendTo($dlfex2);
        $("<div>")
            .addClass("col-md-4 form-group")
            .append($("<small>").text("Cartão"))
            .append(
                $("<input>")
                    .attr("type", "text")
                    .addClass("form-control")
                    .attr("id", InputCardPercentage)
                    .attr("name", "card[]")
                    .attr("placeholder", "0,00%")
                    .val("0,00%")
            )
            .appendTo($dlfex2);
    }

    createPixelComponent(whatever) {
        //Gerar um ID único para o componente
        const uniqueIdComponent = `pixel-component-${this.idPixel}`;

        // Criar o elemento jQuery para o card
        const $card = $("<div>")
            .addClass("card my-3 bg-light border")
            .attr("id", uniqueIdComponent);
        const $cardBody = $("<div>").addClass("card-body").appendTo($card);

        // criar o botão "Excluir"
        const $deleteButton = $("<button>")
            .attr("id", `delete-pixel-${this.idPixel}`)
            .attr("type", "button")
            .addClass("btn btn-danger btn-xs rounded-right mr-n2 mt-n3")
            .text("Excluir")
            .append($("<i>").addClass("uil uil-trash-alt"));

        // Quando o botão "Excluir" for clicado
        $deleteButton.on("click", function () {
            // remove o card quando for clicado
            $(`#${uniqueIdComponent}`).remove();
            // Adiciona o ID do pixel deletado ao array
            deletedPixelIds.push(this.idPixel);
        });

        // Adiciona o botão "Excluir" ao cabeçalho
        $("<div>")
            .addClass("w-100 text-right")
            .append($deleteButton)
            .appendTo($cardBody);

        const pixelId = `pixel-id-${this.idPixel}`;
        const $formRow = $("<div>").addClass("form-row").appendTo($cardBody);

        if (whatever === "@GoogleAds") {

            this.createPixelInput("Google Analytics", "UA-000000-X", pixelId, $formRow, "pixel[]", "pixel_id[]");
            this.createPixelInput("ID de Conversão Google Ads", "AW-XXXXXXXXXXXXX", pixelId, $formRow, "api[]", "api_id[]");
            this.createPixelCheckbox($cardBody);

        } else if (whatever === "@Facebook") {

            this.createPixelInput("Pixel do Facebook", "Apenas ID do Pixel", pixelId, $formRow, "pixel[]", "pixel_id[]");
            this.createPixelInput("Token da API do Facebook", "EAA5XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", pixelId, $formRow, "api[]", "api_id[]")
            this.createPixelCheckbox($cardBody);
            this.createPixelInputPercentage($cardBody);

        } else if (whatever === "@Tiktok") {

            this.createPixelInput("Tiktok Pixel", "Apenas ID do Pixel", pixelId, $formRow, "pixel[]", "pixel_id[]");
            this.createPixelCheckbox($cardBody);
            this.createPixelInputPercentage($cardBody);
        }

        return $card;
    }

}

// Mapeamento dos botões e suas informações correspondentes
const buttonInfoMap = {
    "@GoogleAds": {
        title: "Google Ads",
        description:
            "Utilize este traqueamento para receber as informações de quantas pessoas clicaram no seu anúncio do Google!",
        imageUrl: "assets/images/svg/google-ads.png",
        alt: "Google Ads",
    },
    "@Facebook": {
        title: "Facebook",
        description:
            "Use a API do Facebook Ads para conectar as informações da sua venda.",
        imageUrl: "assets/images/svg/facebook.png",
        alt: "Facebook",
    },
    "@Tiktok": {
        title: "Tiktok",
        description:
            "Saiba o quanto o seu produto está caindo na boca do povo no Tiktok!",
        imageUrl: "assets/images/svg/tiktok.png",
        alt: "Tiktok",
    },
};

const Page = {

    init: () => {
        Page.setListeners();
        Page.submitForm();
        Page.clickAddPixel();
    },

    setListeners: () => { },

    submitForm: () => {
        const product_id = $("#product-id").val();
        const offer_id = $("#offer-id").val();
        const formUpdateOffer = $("#formUpdateOffer");
        const formSetPixel = $("#formSetPixel");

        formUpdateOffer.on("submit", function (event) {
            event.preventDefault();

            const formData = formUpdateOffer.serialize();
            const URL = "/oferta/";

            $.ajax({
                url: URL,
                method: "PUT",
                data: formData,
                dataType: "JSON",
                success: function (data, textStatus, xhr) {
                    swalBootstrap
                        .fire({
                            icon: "success",
                            title: "Sucesso!",
                            text: `${data.success || "Oferta criada com sucesso"}`,
                        })
                        .then((result) => {
                            $(".modal").modal("hide");
                            document.location.reload(true);
                        });
                },
                error: function (xhr) {
                    console.log("xhr::: ", xhr);
                    if (xhr.status == 409) {
                        swalBootstrap.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Já existe uma oferta parecida! verifique e tente novamente.",
                        });
                        return;
                    }

                    if (xhr.status == 422) {
                        swalBootstrap.fire({
                            icon: "error",
                            title: "Oops...",
                            text:
                                xhr.responseJSON.message ||
                                "Parece que você não informou dados o suficiente, verifique-os e tente novamente",
                        });
                        return;
                    }

                    swalBootstrap.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Algo deu errado! confirme os dados e tente novamente",
                    });
                },
            });
        });

        formSetPixel.on("submit", function (event) {
            event.preventDefault();

            Page.formatSubmitData();
        });
    },

    openPixeltOffer: (element) => {
        let offer_id = $(element).data("offer");
        let pixel = $(element).data("pixel");

        const URL = `/oferta/get-pixel/?offer=${offer_id}&pixel=${pixel}`;

        // $.ajax({
        //         url: URL,
        //         method: 'GET',
        //         dataType: 'JSON',
        //         success:function(data, textStatus, xhr){
        //             $('#UpdatePixelModal').modal('show');

        //             if(data.hasPixel){
        //                 $.each(data.pixels, function(key, pixel){

        //                 });
        //             }
        //         },
        //         error: function(xhr) {
        //             console.log('xhr::: ', xhr);
        //             if(xhr.status == 409){
        //                 swalBootstrap.fire({
        //                     icon: 'error',
        //                     title: 'Oops...',
        //                     text: 'Já existe uma oferta parecida! verifique e tente novamente.'
        //                 });
        //                 return;
        //             }

        //             if(xhr.status == 422){
        //                 swalBootstrap.fire({
        //                     icon: 'error',
        //                     title: 'Oops...',
        //                     text: xhr.responseJSON.message || 'Parece que você não informou dados o suficiente, verifique-os e tente novamente'
        //                 });
        //                 return;
        //             }

        //             swalBootstrap.fire({
        //                 icon: 'error',
        //                 title: 'Oops...',
        //                 text: 'Algo deu errado! confirme os dados e tente novamente'
        //             });
        //         }
        // })
    },

    createUrlFriendly: (Value, Output) => {
        const URL = `/oferta/url-friendly/?string=${Value}`;

        $.ajax({
            url: URL,
            method: "GET",
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                $(Output).val(data.url);
            },
            error: function (xhr) {
                swalBootstrap.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo deu errado! confirme os dados e tente novamente",
                });
            },
        });
    },

    clickAddPixel: () => {
        $(document).ready(function () {
            $(".btn-add-pixel").on("click", function () {
                // Contando quantos elementos com a classe .card existem
                let totalCard = $(".card").length;

                // Maior ID usado pelos componentes existentes
                let maxUsedId = 0;
                // Encontrando o maior ID usado pelos componentes existentes
                // seleciona todos os elementos com a classe .card que possuem um atributo id começando com "pixel-id-".
                $('.card [id^="pixel-id-"]').each(function () {
                    const id = parseInt(this.id.replace("pixel-id-", ""), 10);
                    maxUsedId = Math.max(maxUsedId, id);
                });

                let newIdPixel = maxUsedId + 1;
                while (deletedPixelIds.includes(newIdPixel)) {
                    newIdPixel++;
                }

                const pixelComponentInstance = new PixelComponent(
                    "",
                    "",
                    false,
                    false,
                    false,
                    newIdPixel,
                );

                const whatever = $(this).attr("data-whatever");

                const pixelComponent = pixelComponentInstance.createPixelComponent(whatever);

                $("#pixel-container").append(pixelComponent);
            });
        });
    },

    openPixeltOffer: (button) => {
        // Obtém os atributos personalizados do botão clicado
        const whatever = button.getAttribute("data-whatever");

        // Atualiza o conteúdo do modal com as informações específicas do botão clicado
        const modalTitleSocial = document.getElementById("modal-title-social");
        const modalImage = document.getElementById("modal-image");
        const modalDescription = document.getElementById("modal-description");

        //Adiciona data-whatever ao botao adicionar serviço
        $(".btn-add-pixel").attr('data-whatever', whatever);

        // Obtém as informações do botão a partir do mapeamento
        const buttonInfo = buttonInfoMap[whatever];

        // Verifica se as informações do botão existem no mapeamento
        if (buttonInfo) {
            // Atualiza o conteúdo do modal com as informações do botão
            modalTitleSocial.innerText = buttonInfo.title;
            modalDescription.innerText = buttonInfo.description;
            modalImage.src = buttonInfo.imageUrl;
            modalImage.alt = buttonInfo.alt;
        } else {
            // Trate o caso em que o botão clicado não está mapeado
            modalTitleSocial.innerText = "Informação Indisponível";
            modalDescription.innerText =
                "Desculpe, as informações para este botão não estão disponíveis no momento.";
        }

        // Limpa o conteúdo do modal
        // $('#pixel-container').empty();

        // Exibe o modal
        $("#UpdatePixelModal").modal("show");
    },

    formatSubmitData: () => {
        let arr = [];

        console.log("🚀 ~ file: offer.js:530 ~ arr:", arr)

        //Validaçao se existe componente
        if (!$('[id^="pixel-component-"]').length) {
            swalBootstrap.fire({title: 'Oopss!',text: `Adicione um componente`,icon: 'warning',})
            return false;
        }


        $('[id^="pixel-component-"]').each((i, el) => {

            let idPixel = $(el).attr("id").replace("pixel-component-", "");
            console.log("🚀 ~ file: offer.js:534 ~ $ ~ idPixel:", idPixel)

            //Input Id
            let InputHiddenPixelId = $(el).find('input[name="pixel_id[]"]').val();
            console.log("🚀 ~ file: offer.js:538 ~ $ ~ InputHiddenPixelId:", InputHiddenPixelId)
            let InputHiddenApiKeyId = $(el).find('input[name="api_id[]"]').val();
            console.log("🚀 ~ file: offer.js:541 ~ $ ~ InputHiddenApiKeyId:", InputHiddenApiKeyId)
            

            // Text for Input
            let InputTextPixel = $(el).find('input[name="pixel[]"]').val();
            console.log("🚀 ~ file: offer.js:544 ~ $ ~ InputPixel:", InputTextPixel)
            let InputTextApi = $(el).find('input[name="api[]"]').val();
            console.log("🚀 ~ file: offer.js:546 ~ $ ~ InputApi:", InputTextApi)

            //Checkbox
            let InputCheckboxTicket = $(el).find('input[name="sendTicket"]').is(":checked");
            console.log("🚀 ~ file: offer.js:544 ~ $ ~ InputCheckboxTicket:", InputCheckboxTicket)
            let InputCheckboxPix = $(el).find('input[name="sendPix"]').is(":checked");
            console.log("🚀 ~ file: offer.js:546 ~ $ ~ InputCheckboxPix:", InputCheckboxPix)
            let InputCheckboxCard = $(el).find('input[name="sendCard"]').is(":checked");
            console.log("🚀 ~ file: offer.js:548 ~ $ ~ InputCheckboxCard:", InputCheckboxCard)

            //Input Percentage
            let InputTicketPercentage = $(el).find('input[name="boleto[]"]').val();
            console.log("🚀 ~ file: offer.js:552 ~ $ ~ InputTicketPercentage:", InputTicketPercentage)
            let InputPixPercentage = $(el).find('input[name="pix[]"]').val();
            console.log("🚀 ~ file: offer.js:554 ~ $ ~ InputPixPercentage:", InputPixPercentage)
            let InputCardPercentage = $(el).find('input[name="card[]"]').val();
            console.log("🚀 ~ file: offer.js:556 ~ $ ~ InputCardPercentage:", InputCardPercentage)


            const whatever = $(".btn-add-pixel").data("whatever");

            console.log("🚀 ~ file: offer.js:580 ~ $ ~ whatever:", whatever)
            
            arr.push({
                pixel: idPixel,

                InputHiddenPixelId,
                InputHiddenApiKeyId,

                InputTextPixel,
                InputTextApi,

                InputCheckboxTicket, 
                InputCheckboxPix, 
                InputCheckboxCard,

                InputTicketPercentage, 
                InputPixPercentage, 
                InputCardPercentage,

                whatever
            });
            console.log("🚀 ~ file: offer.js:561 ~ $ ~ arr:", arr)
    
            

            //Validação Input Text
            if (!InputTextPixel || InputTextPixel === '') {
                swalBootstrap.fire({title: 'Oopss!',text: `Informe o Pixel`,icon: 'warning',})
                return false;
            }

            if (whatever === "@Facebook" || whatever === "@GoogleAds") {
                if (!InputTextApi || InputTextApi === '') {
                    swalBootstrap.fire({title: 'Oopss!',text: `Informe a API`,icon: 'warning',})
                    return false;
                }
            }

            //Validaçao Input Checkbox
            if (!InputCheckboxTicket && !InputCheckboxPix && !InputCheckboxCard) {
                swalBootstrap.fire({title: 'Oopss!',text: `Informe a forma de pagamento`,icon: 'warning',})
                return false;
            }

        });


        return arr;
    },

    copyUrlFriendlyToCLipboard(element, event = null, title = "Link copiado!") {
        if (event) {
            event.preventDefault();
        }

        // O atributo data-link deve conter o valor a ser copiado
        const base = $(element).attr("data-link");
        const params = $(element).val();
        copyText = base + params;
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

Page.init();
