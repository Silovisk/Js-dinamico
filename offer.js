const Page = {
    init: () => {
        Page.setListeners();
        Page.submitForm();
    },

    setListeners: () => {

    },

    submitForm: () => {
        const product_id = $("#product-id").val();
        const offer_id = $("#offer-id").val();
        const formUpdateOffer = $('#formUpdateOffer');

        formUpdateOffer.on('submit', function (event) {
            event.preventDefault();

            const formData = formUpdateOffer.serialize();
            const URL = '/oferta/';

            $.ajax({
                url: URL,
                method: 'PUT',
                data: formData,
                dataType: 'JSON',
                success: function (data, textStatus, xhr) {
                    swalBootstrap.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: `${data.success || 'Oferta criada com sucesso'}`
                    }).then((result) => {
                        $('.modal').modal('hide');
                        document.location.reload(true);
                    })
                },
                error: function (xhr) {
                    console.log('xhr::: ', xhr);
                    if (xhr.status == 409) {
                        swalBootstrap.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Já existe uma oferta parecida! verifique e tente novamente.'
                        });
                        return;
                    }

                    if (xhr.status == 422) {
                        swalBootstrap.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: xhr.responseJSON.message || 'Parece que você não informou dados o suficiente, verifique-os e tente novamente'
                        });
                        return;
                    }

                    swalBootstrap.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo deu errado! confirme os dados e tente novamente'
                    });
                }
            })
        })
    },

    openPixeltOffer: (element) => {
        let offer_id = $(element).data('offer');
        let pixel = $(element).data('pixel');

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
        const URL = `/oferta/url-friendly/?string=${Value}`

        $.ajax({
            url: URL,
            method: 'GET',
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                $(Output).val(data.url);
            },
            error: function (xhr) {
                swalBootstrap.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado! confirme os dados e tente novamente'
                });
            }
        });
    },

    createPixelFacebook: (pixel = '', api = '', sendTicket = false, sendPix = false, sendCard = false, idPixel = '0') => {
        const $card = $('<div>').addClass('card bg-light border');
        const $cardBody = $('<div>').addClass('card-body').appendTo($card);

        // Cabeçalho
        $('<div>').addClass('w-100 text-right')
            .append($('<button>').attr('type', 'button')
                .addClass('btn btn-danger btn-xs rounded-right mr-n2 mt-n3')
                .append($('<i>').addClass('uil uil-trash-alt')))
            .appendTo($cardBody);

        // Inputs Pixel e API
        const $formRow = $('<div>').addClass('form-row').appendTo($cardBody);
        const pixelId = `pixel-id-${idPixel}`; // ID do input pixel
        $('<div>').addClass('col-md-6 form-group')
            .append($('<label>').text('Pixel'))
            .append($('<input>').attr('type', 'text').addClass('form-control').attr('name', 'pixel[]').attr('id', pixelId).val(pixel))
            .append($('<input>').attr('type', 'hidden').attr('name', 'pixel_id[]').val(idPixel))
            .appendTo($formRow);
        $('<div>').addClass('col-md-6 form-group')
            .append($('<label>').text('API'))
            .append($('<input>').attr('type', 'text').addClass('form-control').attr('name', 'api[]').val(api))
            .appendTo($formRow);

        // Checkboxes
        const $formGroup = $('<div>').addClass('form-group mt-3').appendTo($cardBody);
        $('<label>').text('Disparar evento "Purchase" para quais formas de pagamento').appendTo($formGroup);
        const $dFlex = $('<div>').addClass('d-flex').appendTo($formGroup);
        $('<div>').addClass('custom-control col custom-switch')
            .append($('<input>').attr('type', 'checkbox').addClass('custom-control-input').attr('id', 'pixel-active-ticket').attr('name', 'sendTicket').prop('checked', sendTicket))
            .append($('<label>').addClass('custom-control-label').attr('for', 'pixel-active-ticket').text('Boleto'))
            .appendTo($dFlex);
        $('<div>').addClass('custom-control col custom-switch')
            .append($('<input>').attr('type', 'checkbox').addClass('custom-control-input').attr('id', 'pixel-active-pix').attr('name', 'sendPix').prop('checked', sendPix))
            .append($('<label>').addClass('custom-control-label').attr('for', 'pixel-active-pix').text('Pix'))
            .appendTo($dFlex);
        $('<div>').addClass('custom-control col custom-switch')
            .append($('<input>').attr('type', 'checkbox').addClass('custom-control-input').attr('id', 'pixel-active-card').attr('name', 'sendCard').prop('checked', sendCard))
            .append($('<label>').addClass('custom-control-label').attr('for', 'pixel-active-card').text('Cartão'))
            .appendTo($dFlex);

        return $card;
    },

    deletedPixelIds: [],

    // Função para criar o componente
    createPixelComponent: (pixel = '', api = '', sendTicket = false, sendPix = false, sendCard = false, idPixel = 0) => {
        
        // Gerar um ID único para o componente
        const uniqueId = `pixel-component-${idPixel}`;

        // Criar o elemento jQuery para o card
        const $card = $('<div>').addClass('card my-3 bg-light border').attr('id', uniqueId);
        const $cardBody = $('<div>').addClass('card-body').appendTo($card);

        // Cabeçalho
        const $deleteButton = $('<button>')
            .attr('type', 'button')
            .addClass('btn btn-danger btn-xs rounded-right mr-n2 mt-n3')
            .text('Excluir')
            .append($('<i>').addClass('uil uil-trash-alt'));

        $deleteButton.on('click', function () {
            // Remove the card when the "Excluir" button is clicked
            $(`#${uniqueId}`).remove();
            // Add the idPixel to the array of deleted IDs
            Page.deletedPixelIds.push(idPixel);
            console.log("🚀 ~ file: offer.js:206 ~ deletedPixelIds:", Page.deletedPixelIds)
        });

        $('<div>').addClass('w-100 text-right')
            .append($deleteButton)
            .appendTo($cardBody);

        // Inputs Pixel e API
        const $formRow = $('<div>').addClass('form-row').appendTo($cardBody);
        const pixelId = `pixel-id-${idPixel}`; // ID do input pixel
        $('<div>').addClass('col-md-6 form-group')
            .append($('<label>').text('Pixel'))
            .append($('<input>').attr('type', 'text').addClass('form-control').attr('name', 'pixel[]').attr('id', pixelId).val(pixel).attr('placeholder', 'Seu código do facebook pixels'))
            .append($('<input>').attr('type', 'hidden').attr('name', 'pixel_id[]').val(idPixel))
            .appendTo($formRow);
        $('<div>').addClass('col-md-6 form-group')
            .append($('<label>').text('API'))
            .append($('<input>').attr('type', 'text').addClass('form-control').attr('name', 'api[]').val(api))
            .appendTo($formRow);

        // Checkboxes
        const $formGroup = $('<div>').addClass('form-group mt-3').appendTo($cardBody);
        $('<label>').text('Disparar evento "Purchase" para quais formas de pagamento').appendTo($formGroup);
        const $dFlex = $('<div>').addClass('d-flex').appendTo($formGroup);
        $('<div>').addClass('custom-control col custom-switch')
            .append($('<input>').attr('type', 'checkbox').addClass('custom-control-input').attr('id', 'pixel-active-ticket').attr('name', 'sendTicket').prop('checked', sendTicket))
            .append($('<label>').addClass('custom-control-label').attr('for', 'pixel-active-ticket').text('Boleto'))
            .appendTo($dFlex);
        $('<div>').addClass('custom-control col custom-switch')
            .append($('<input>').attr('type', 'checkbox').addClass('custom-control-input').attr('id', 'pixel-active-pix').attr('name', 'sendPix').prop('checked', sendPix))
            .append($('<label>').addClass('custom-control-label').attr('for', 'pixel-active-pix').text('Pix'))
            .appendTo($dFlex);
        $('<div>').addClass('custom-control col custom-switch')
            .append($('<input>').attr('type', 'checkbox').addClass('custom-control-input').attr('id', 'pixel-active-card').attr('name', 'sendCard').prop('checked', sendCard))
            .append($('<label>').addClass('custom-control-label').attr('for', 'pixel-active-card').text('Cartão'))
            .appendTo($dFlex);

        // Input Boleto, Pix, Cartão
        const $formRow2 = $('<div>').addClass('form-row').appendTo($cardBody);
        $('<label>').text('Valor de conversão personalizado para (%)').appendTo($formRow2);
        const $dlfex2 = $('<div>').addClass('d-flex').appendTo($formRow2);
        $('<div>').addClass('col-md-4 form-group')
            .append($('<small>').text('Boleto'))
            .append($('<input>').attr('type', 'text').addClass('form-control').attr('name', 'boleto[]').attr('placeholder', '0,00%').val('0,00%'))
            .appendTo($dlfex2);
        $('<div>').addClass('col-md-4 form-group')
            .append($('<small>').text('Pix'))
            .append($('<input>').attr('type', 'text').addClass('form-control').attr('name', 'pix[]').attr('placeholder', '0,00%').val('0,00%'))
            .appendTo($dlfex2);
        $('<div>').addClass('col-md-4 form-group')
            .append($('<small>').text('Cartão'))
            .append($('<input>').attr('type', 'text').addClass('form-control').attr('name', 'card[]').attr('placeholder', '0,00%').val('0,00%'))
            .appendTo($dlfex2);

        return $card;
    },


    init: function () {

        $(document).ready(function () {
            // Evento de clique no botão "Adicionar pixel"
            $('.btn-add-pixel').on('click', function () {
                // Generate a unique id for the new component
                let totalCard = $('.card').length;
                let newIdPixel = totalCard + 1;
                
                while (Page.deletedPixelIds.includes(newIdPixel)) {
                    console.log("🚀 ~ file: offer.js:275 ~ Page.deletedPixelIds.includes(newIdPixel):", Page.deletedPixelIds.includes(newIdPixel))
                    newIdPixel++;
                }

                const pixelComponent = Page.createPixelComponent('', '', false, false, false, newIdPixel);

                // Adicionar o componente ao modal (assumindo que o modal tem o ID "pixel-container")
                $('#pixel-container').append(pixelComponent);
            });
        });
    },



    copyUrlFriendlyToCLipboard(element, event = null, title = "Link copiado!") {

        if (event) {
            event.preventDefault();
        }

        // O atributo data-link deve conter o valor a ser copiado 
        const base = $(element).attr('data-link');
        const params = $(element).val();
        copyText = base + params;
        navigator.clipboard.writeText(copyText);

        swalBootstrap.fire({
            position: 'bottom-end',
            icon: 'success',
            title: title,
            html: `<b>${copyText}</b>`,
            showConfirmButton: false,
            timerProgressBar: true,
            showCloseButton: true,
            timer: 2000,
            toast: true,
        })

        return false;
    },
};

// const pixelComponent = createPixelComponent('C560PP5424M4KL4LP42J', '', true, false, true);

Page.init();
