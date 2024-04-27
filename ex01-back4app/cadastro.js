const chamadoURL = "https://parseapi.back4app.com/classes/Chamado";
const headersJson = {
    "X-Parse-Application-Id": process.env.APP_ID,
    "X-Parse-REST-API-Key": process.env.API_KEY,
    "Content-Type": "application/json",
};

document.getElementById("btCadastrar").onclick = async () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;

    if (!nome || !email || !assunto || !mensagem) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    const response = await fetch(chamadoURL, {
        method: "POST",
        headers: headersJson,
        body: JSON.stringify({ nome, email, assunto, mensagem, finalizado: false }),
    });
    const data = await response.json();
    console.log(data);

    alert("Chamado cadastrado com sucesso!");
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("assunto").value = "";
    document.getElementById("mensagem").value = "";
};
