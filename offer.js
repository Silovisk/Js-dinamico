const deletedPixelIds = [];
const pixelData = {};
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

  createPixelCard() {
    const uniqueIdComponent = `pixel-component-${this.idPixel}`;

    const $card = $("<div>")
      .addClass("card my-3 bg-light border")
      .attr("id", uniqueIdComponent);

    return $card;
  }

  createPixelHeader($card) {
    const $cardHeader = $("<div>").addClass("card-header").appendTo($card);

    return $cardHeader;
  }

  createPixelBody($card) {
    const $cardBody = $("<div>").addClass("card-body").appendTo($card);

    return $cardBody;
  }

  createButtonDeletePixel($cardHeader) {
    const $deleteButton = $("<button>")
      .attr("id", `delete-pixel-${this.idPixel}`)
      .attr("type", "button")
      .addClass("btn btn-danger btn-xs rounded-right mr-n2 mt-n3")
      .text("Excluir")
      .append($("<i>").addClass("uil uil-trash-alt"));

    $("<div>")
      .addClass("w-100 text-right")
      .append($deleteButton)
      .appendTo($cardHeader);
  }

  deleteComponentPixel($deleteButton) {
    $deleteButton.on("click", () => {
      const uniqueIdComponent = `pixel-component-${this.idPixel}`;
      $(`#${uniqueIdComponent}`).remove();
      deletedPixelIds.push(this.idPixel);
    });
  }

  createPixelInput(
    labelText,
    placeholderText,
    pixelId,
    InputAttrName,
    InputAttrNameHidden,
    $formRow
  ) {
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

    $("<div>").addClass("form-group mt-3").appendTo($formGroup);
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

    $("<div>").addClass("col-md-4 form-group").appendTo($formGroup2);
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
    const $card = this.createPixelCard();
    const $cardHeader = this.createPixelHeader($card);
    const $cardBody = this.createPixelBody($card);

    const $formRow = $("<div>").addClass("form-row").appendTo($cardBody);

    this.createButtonDeletePixel($cardHeader);

    this.deleteComponentPixel(
      $cardHeader.find(`#delete-pixel-${this.idPixel}`)
    );

    const pixelId = `pixel-id-${this.idPixel}`;

    if (whatever === "@GoogleAds") {
      this.createPixelInput(
        "Google Analytics",
        "UA-000000-X",
        pixelId,
        "pixel[]",
        "pixel_id[]",
        $formRow
      );
      this.createPixelInput(
        "ID de Conversão Google Ads",
        "AW-XXXXXXXXXXXXX",
        pixelId,
        "api[]",
        "api_id[]",
        $formRow
      );
      this.createPixelCheckbox($cardBody);
    } else if (whatever === "@Facebook") {
      this.createPixelInput(
        "Pixel do Facebook",
        "Apenas ID do Pixel",
        pixelId,
        "pixel[]",
        "pixel_id[]",
        $formRow
      );
      this.createPixelInput(
        "Token da API do Facebook",
        "EAA5XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        pixelId,
        "api[]",
        "api_id[]",
        $formRow
      );
      this.createPixelCheckbox($cardBody);
      this.createPixelInputPercentage($cardBody);
    } else if (whatever === "@Tiktok") {
      this.createPixelInput(
        "Tiktok Pixel",
        "Apenas ID do Pixel",
        pixelId,
        "pixel[]",
        "pixel_id[]",
        $formRow
      );
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

  setListeners: () => {},

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

  openModalPixeltOffer: (button) => {
    this.whatever = button.getAttribute("data-whatever");

    const modalTitleSocial = document.getElementById("modal-title-social");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");

    $(".btn-add-pixel").attr("data-whatever", whatever);

    const buttonInfo = buttonInfoMap[this.whatever];

    if (buttonInfo) {
      modalTitleSocial.innerText = buttonInfo.title;
      modalDescription.innerText = buttonInfo.description;
      modalImage.src = buttonInfo.imageUrl;
      modalImage.alt = buttonInfo.alt;
    } else {
      modalTitleSocial.innerText = "Informação Indisponível";
      modalDescription.innerText =
        "Desculpe, as informações para este botão não estão disponíveis no momento.";
    }

    $("#pixel-container").empty();

    $("#UpdatePixelModal").modal("show");
  },

  clickAddPixel: () => {
    $(document).ready(function () {
      $(".btn-add-pixel").on("click", function () {
        let totalCard = $(".card").length;

        let maxUsedId = 0;
        $('.card [id^="pixel-id-"]').each(function () {
          const id = parseInt(this.id.replace("pixel-id-", ""), 10);
          console.log(`DEBUG: Checking id ${id}`);
          maxUsedId = Math.max(maxUsedId, id);
        });
        console.log(`DEBUG: Max used id is ${maxUsedId}`);

        let newIdPixel = maxUsedId + 1;
        while (deletedPixelIds.includes(newIdPixel)) {
          console.log(
            `DEBUG: Skipping id ${newIdPixel} because it was deleted`
          );
          newIdPixel++;
        }
        console.log(`DEBUG: New id is ${newIdPixel}`);

        const whatever = $(this).attr("data-whatever");

        let pixelComponentInstance = null;

        const idPixel = newIdPixel;
        if (pixelData.hasOwnProperty(idPixel)) {
          const pixelDataForId = pixelData[idPixel];

          pixelComponentInstance = new PixelComponent(
            pixelDataForId.InputTextPixel,
            pixelDataForId.InputTextApi,
            pixelDataForId.InputCheckboxTicket,
            pixelDataForId.InputCheckboxPix,
            pixelDataForId.InputCheckboxCard,
            newIdPixel,
            whatever
          );
        } else {
          pixelComponentInstance = new PixelComponent(
            "",
            "",
            false,
            false,
            false,
            newIdPixel,
            whatever
          );
        }

        const pixelComponent =
          pixelComponentInstance.createPixelComponent(whatever);

        $("#pixel-container").append(pixelComponent);
      });
    });
  },

  formatSubmitData: () => {
    let pixelData = [];
    //Validaçao se existe componente
    if (!$('[id^="pixel-component-"]').length) {
      swalBootstrap.fire({
        title: "Oopss!",
        text: `Adicione um componente`,
        icon: "warning",
      });
      return false;
    }

    $('[id^="pixel-component-"]').each((i, el) => {
      let idPixel = $(el).attr("id").replace("pixel-component-", "");
      //Input Id
      let InputHiddenPixelId = $(el).find('input[name="pixel_id[]"]').val();
      let InputHiddenApiKeyId = $(el).find('input[name="api_id[]"]').val();
      // Text for Input
      let InputTextPixel = $(el).find('input[name="pixel[]"]').val();
      let InputTextApi = $(el).find('input[name="api[]"]').val();
      //Checkbox
      let InputCheckboxTicket = $(el)
        .find('input[name="sendTicket"]')
        .is(":checked");
      let InputCheckboxPix = $(el).find('input[name="sendPix"]').is(":checked");
      let InputCheckboxCard = $(el)
        .find('input[name="sendCard"]')
        .is(":checked");
      //Input Percentage
      let InputTicketPercentage = $(el).find('input[name="boleto[]"]').val();
      let InputPixPercentage = $(el).find('input[name="pix[]"]').val();
      let InputCardPercentage = $(el).find('input[name="card[]"]').val();
      const whatever = $(".btn-add-pixel").data("whatever");
      pixelData[idPixel] = {
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

        whatever,
      };
      //Validação Input Text
      if (!InputTextPixel || InputTextPixel === "") {
        swalBootstrap.fire({
          title: "Oopss!",
          text: `Informe o Pixel`,
          icon: "warning",
        });
        return false;
      }

      if (whatever === "@Facebook" || whatever === "@GoogleAds") {
        if (!InputTextApi || InputTextApi === "") {
          swalBootstrap.fire({
            title: "Oopss!",
            text: `Informe a API`,
            icon: "warning",
          });
          return false;
        }
      }

      //Validaçao Input Checkbox
      if (!InputCheckboxTicket && !InputCheckboxPix && !InputCheckboxCard) {
        swalBootstrap.fire({
          title: "Oopss!",
          text: `Informe a forma de pagamento`,
          icon: "warning",
        });
        return false;
      }
    });
    console.log("🚀 ~ file: offer.js:672 ~ pixelData:", pixelData);
    return pixelData;
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
