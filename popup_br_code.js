document.addEventListener("DOMContentLoaded", loadOptions);
let db;

function hello(e) {
  e.preventDefault();
  // @ts-ignore
  const phone = document.getElementById("number").value;
  // @ts-ignore
  const countryBox = document.getElementById("ccode").value;
  // @ts-ignore
  const manualcountrycode = document.getElementById("ccode2").value;
  let country = countryBox !== "add" ? countryBox : manualcountrycode;
  // @ts-ignore
  const message = document.getElementById("message").value;
  // @ts-ignore
  const openWith = document.getElementById("openWith").value;
  
  if (countryBox === "add" && manualcountrycode.length === 0) {
    // @ts-ignore
    document
      .getElementById("ccode2")
      .setAttribute("class", "form-control ddiBox required");
    // @ts-ignore
    document.getElementById("ccode2").setAttribute("placeholder", "Required!");
    return false;
  }

  if (!phone) {
    const inputClass =
      countryBox !== "add"
        ? "form-control required"
        : "form-control numberBox required";
    // @ts-ignore
    document.getElementById("number").setAttribute("class", inputClass);
    // @ts-ignore
    document
      .getElementById("number")
      .setAttribute("placeholder", "Number is required!");
    // add focus
    // @ts-ignore
    document.getElementById("number").focus();
    return false;
  }

  if (manualcountrycode) {
    setManualCountry(manualcountrycode);
  }
  if (message) saveTemplate(message);
  callTheWhatsApp({
    country,
    phone,
    message,
    openWith,
  });
}

function callTheWhatsApp(attributes) {
  const { country, phone, openWith } = attributes;
  let { message } = attributes;
  if (openWith !== "app") {
    message = message.replace(/\n/g, "%0A");
  }
  const url =
    openWith === "app"
      ? `https://wa.me/${country}${phone}/?text=${message}`
      : `https://web.whatsapp.com/send?phone=${country}${phone}&text=${message}`;

  const urlFind =
    openWith === "app"
      ? "https://api.whatsapp.com/*"
      : "https://web.whatsapp.com/*";

  const updateTab = (tabId) => {
    return new Promise((resolve) => {
      // @ts-ignore
      chrome.tabs.update(tabId, { url, active: true }, resolve);
    });
  };

  const createTab = () => {
    return new Promise((resolve) => {
      // @ts-ignore
      chrome.tabs.create({ url, active: true }, resolve);
    });
  };

  // @ts-ignore
  chrome.tabs.query({ url: urlFind }, function (tabs) {
    if (tabs.length > 0) {
      updateTab(tabs[0].id);
    } else {
      createTab();
    }
  });
}

function cleanPhone() {
  // @ts-ignore
  const phone = document.getElementById("number").value;
  const phoneClean = clean(phone);
  // @ts-ignore
  document.getElementById("number").value = phoneClean;
}

function cleanDDI() {
  // @ts-ignore
  const ddi = document.getElementById("ccode2").value;
  const ddiClean = clean(ddi);
  // @ts-ignore
  document.getElementById("ccode2").value = ddiClean;
}

function clean(number) {
  return number.replace(/\D/g, "");
}

function changecountry() {
  // @ts-ignore
  const country = document.getElementById("ccode").value;
  if (country === "add") {
    const ccode2 = document.getElementById("ccode2");
    const number = document.getElementById("number");
    ccode2?.setAttribute("class", "form-control ddiBox");
    number?.setAttribute("class", "form-control numberBox");
  } else {
    const ccode2 = document.getElementById("ccode2");
    const number = document.getElementById("number");
    ccode2?.setAttribute("class", "hidden");
    number?.setAttribute("class", "form-control");
  }
  setCountry(country);
}

function setCountry(country) {
  // @ts-ignore
  db.set({
    countrycode: country,
  });
}

function loadCountryCode() {
  // @ts-ignore
  db.get(
    {
      countrycode: "1",
    },
    function (items) {
      // @ts-ignore
      document.getElementById("ccode").value = items.countrycode;
      if (items.countrycode === "add") {
        // @ts-ignore
        document
          .getElementById("ccode2")
          .setAttribute("class", "form-control ddiBox");
        // @ts-ignore
        document
          .getElementById("number")
          .setAttribute("class", "form-control numberBox");
        loadManualCountryCode();
      }
    }
  );
}

function loadManualCountryCode() {
  // @ts-ignore
  db.get(
    {
      manualcountrycode: "1",
    },
    function (items) {
      // @ts-ignore
      document.getElementById("ccode2").value = items.manualcountrycode || "";
    }
  );
}

function setManualCountry(country) {
  // @ts-ignore
  db.set({
    manualcountrycode: country,
  });
}

function changeAppType() {
  // @ts-ignore
  const appType = document.getElementById("openWith").value;
  // @ts-ignore
  db.set({
    appType,
  });
}

function loadAppType() {
  // @ts-ignore
  db.get(
    {
      appType: "app",
    },
    function (items) {
      // @ts-ignore
      document.getElementById("openWith").value = items.appType;
    }
  );
}

function loadTemplate() {
  // @ts-ignore
  db.get(
    {
      whatsappTemplateMessage: "",
    },
    function (items) {
      // @ts-ignore
      document.getElementById("message").innerHTML =
        items.whatsappTemplateMessage;
    }
  );
}

function saveTemplate(message) {
  // @ts-ignore
  db.set({
    whatsappTemplateMessage: message,
  });
}

function loadBtnExtra() {
  if (!document.getElementById("btnExtra")) return;
  const date = new Date();
  const seconds = date.getSeconds();
  const isOdd = seconds % 2;
  const btnExtra = document.getElementById("btnExtra");
  if (isOdd) {
    // @ts-ignore
    btnExtra.setAttribute("class", "btn3");
    // @ts-ignore
    btnExtra.setAttribute("target", "_blank");
    // @ts-ignore
    btnExtra.setAttribute("href", "http://bit.ly/3ZJvdJu");
    // @ts-ignore
    btnExtra.textContent = chrome.i18n.getMessage("btnEvaluate");
  } else {
    // @ts-ignore
    btnExtra.setAttribute("class", "btn2");
    // @ts-ignore
    btnExtra.setAttribute("href", "popup2.html");
    // @ts-ignore
    btnExtra.textContent = chrome.i18n.getMessage("btnNewExtension");
  }
}

function loadSetup() {
  // @ts-ignore
  document.getElementById("number").addEventListener("blur", cleanPhone);
  // @ts-ignore
  document.getElementById("ccode2").addEventListener("blur", cleanDDI);
  // @ts-ignore
  document.getElementById("butowa").addEventListener("click", hello);
  // @ts-ignore
  document.getElementById("ccode").addEventListener("change", changecountry);
  // @ts-ignore
  document.getElementById("openWith").addEventListener("change", changeAppType);
  // @ts-ignore
  document
    .getElementById("butonreview")
    .addEventListener("click", reviewDisabled);
}

function loadOptions() {
  // @ts-ignore
  db = chrome.storage.local;
  if (document.getElementById("number")) {
    loadSetup();
    loadCountryCode();
    loadManualCountryCode();
    loadTemplate();
    loadAppType();
    loadBtnExtra();
    populateTemplatesSelect();
    loadReview();
  }
}

const templatesSelect = document.getElementById("templates");
let formDataArray = [];
function populateTemplatesSelect() {
  // ObtÃ©m a array de itens do storage.local
  // @ts-ignore
  chrome.storage.local.get({ formDataArray: [] }, function (result) {
    formDataArray = result.formDataArray;
    if (formDataArray.length > 0) {
      // Limpa as opÃ§Ãµes existentes no 'select'
      // @ts-ignore
      templatesSelect.innerHTML = "";
      const option = document.createElement("option");
      // @ts-ignore
      option.value = false;
      option.textContent = "Templates...";
      // @ts-ignore
      templatesSelect.appendChild(option);

      // Adiciona uma opÃ§Ã£o para cada item na array
      for (const element of formDataArray) {
        const option = document.createElement("option");
        option.value = element.templateId;
        option.textContent = element.templateName;
        // @ts-ignore
        templatesSelect.appendChild(option);
      }
    }
  });
}

// Adiciona um event listener para o evento 'change' do 'select'
// @ts-ignore
templatesSelect.addEventListener("change", function () {
  // ObtÃ©m o item selecionado no 'select'
  // @ts-ignore
  const selectedTemplateId = templatesSelect.value;

  // Encontra o item na array pelo ID
  const selectedTemplate = formDataArray.find(
    (item) => item.templateId == selectedTemplateId
  );

  // Preenche os campos do formulÃ¡rio com os dados do item selecionado
  if (selectedTemplate) {
    // @ts-ignore
    document.getElementById("message").value = selectedTemplate.templateMessage;
  } else {
    // Se o item selecionado nÃ£o for encontrado na array, limpa os campos do formulÃ¡rio
    // @ts-ignore
    document.getElementById("message").value = "";
  }
});

// FunÃ§Ã£o para abrir a pÃ¡gina de configuraÃ§Ã£o da extensÃ£o em uma nova aba
function abrirPaginaConfiguracao() {
  // @ts-ignore
  chrome.tabs.create({ url: "templates.html" });
}

// Adicione um ouvinte de evento para o botÃ£o de configuraÃ§Ã£o
// @ts-ignore
const btnTemplates = document.getElementById("btnTemplates");
btnTemplates?.addEventListener("click", abrirPaginaConfiguracao);

async function loadReview() {
  // @ts-ignore
  let { review, trial } = await db.get(["review", "trial"]);
  const currentTime = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 dias em milissegundos

  if (!trial) {
    // Se 'trial' nÃ£o existir, grava o timestamp atual
    await db.set({ trial: currentTime });
  } else {
    if (currentTime - trial >= oneWeek && !review) {
      const btnSend = document.getElementById("butowa");
      const btnReview = document.getElementById("butonreview");
      const phone = document.getElementById("number");
      const messageInput = document.getElementById("message");

      btnSend?.setAttribute("class", "hidden");
      btnReview?.setAttribute("class", "btn");
      phone?.setAttribute("disabled", "disabled");
      // @ts-ignore
      messageInput.value =
        "NecessÃ¡rio fazer a avaliaÃ§Ã£o POSITIVA da extensÃ£o da loja do Google Chrome";
      messageInput?.setAttribute("class", "form-control required");
    }
  }
}

function reviewDisabled() {
  // @ts-ignore
  db.set({ review: "true" });
}