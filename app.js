const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Olá, mundo!' });
});

app.get('/triangulo', (req, res) => {
    const lado1 = Number(req.query.lado1);
    const lado2 = Number(req.query.lado2);
    const lado3 = Number(req.query.lado3);

    let tipo = "";


    if (lado1 < 0 || lado2 < 0 || lado3 < 0) {

        res.json({ mensagem: `Os lados são: ${lado1}, ${lado2} e ${lado3}, mas não formam triangulo porque um dos não é positivo.` });

    }


    else if (((lado1 + lado2) > lado3) && ((lado1 + lado3) > lado2) && ((lado2 + lado3) > lado1)) {

        if (lado1 == lado2 && lado2 == lado3) {
            tipo = "Equilátero";
        }

        else if (lado1 !== lado2 && lado1 !== lado3 && lado2 !== lado3) {
            tipo = "Escaleno";
        }

        else {
            tipo = "Isóceles";
        }

        res.json({ mensagem: `Os lados são: ${lado1}, ${lado2} e ${lado3}, e formam um triangulo ${tipo}.` });
    }

    else {
        res.json({ mensagem: `Os lados são: ${lado1}, ${lado2} e ${lado3}, mas não formam triangulo pois as condições de existência não foram atendidas.` });
    }



});

app.post('/boletim', (req, res) => {


    const {nome, nota1, nota2, frequencia} = req.body;
    const media = (nota1+nota2)/2;

    let status = '';

    if (nome == null || frequencia < 0 || frequencia > 100 || nota1 < 0 || nota2 < 0 || nota1 > 10 || nota2 > 10)
    {
         res.json({ message: 'Um erro ocorreu. Verifique se o nome não esteja vazio, se a frequencia está entre 0 e 100 e se as notas estão entre 0 a 10.' });
    }

    if (frequencia < 75)
    {
        status = "Reprovado por falta.";
    }

    else if (media >= 7)
    {
        status = "Aprovado.";
    }

    else if (media >= 5 && media < 7)
    {
        status = "de Recuperação.";
    }

    else {
        status = "Reprovado por Nota Insuficiente;";
    }

    res.json({ message: `O aluno ${nome} teve média ${media} e frequencia de ${frequencia}%, portanto está ${status}` });


});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})

