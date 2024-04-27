const chamadoURL = "https://parseapi.back4app.com/classes/Chamado";
const headers = {
    "X-Parse-Application-Id": process.env.APP_ID,
    "X-Parse-REST-API-Key": process.env.API_KEY
};

document.getElementById("btCarregar").onclick = async () => {
    const mostrarNaoFinalizados = document.getElementById("mostrarNaoFinalizados").checked;
    let url = chamadoURL;
    if (mostrarNaoFinalizados) {
        const where = encodeURIComponent(JSON.stringify({ finalizado: false }));
        url += `?where=${where}`;
    }

    const response = await fetch(url, { method: "GET", headers });
    const data = await response.json();
    const listaChamados = document.getElementById("listaChamados");
    listaChamados.innerHTML = '';

    data.results.forEach(chamado => {
        const li = document.createElement("li");
        li.textContent = `${chamado.nome} - ${chamado.assunto}`;
        const respostaInput = document.createElement("input");
        respostaInput.placeholder = "Escreva uma resposta";
        const finalizarCB = document.createElement("input");
        finalizarCB.type = "checkbox";
        finalizarCB.checked = chamado.finalizado;
        finalizarCB.onchange = () => finalizarChamado(chamado.objectId, finalizarCB.checked);
        const responderButton = document.createElement("button");
        responderButton.textContent = "Responder e finalizar";
        responderButton.onclick = () => {
            responderChamado(chamado.objectId, respostaInput.value);
            finalizarChamado(chamado.objectId, true);
        };

        li.appendChild(respostaInput);
        li.appendChild(responderButton);
        li.appendChild(finalizarCB);
        listaChamados.appendChild(li);
    });
};

const responderChamado = async (objectId, resposta) => {
    await fetch(`${chamadoURL}/${objectId}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ resposta })
    });
};

const finalizarChamado = async (objectId, finalizado) => {
    await fetch(`${chamadoURL}/${objectId}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ finalizado })
    });
};
