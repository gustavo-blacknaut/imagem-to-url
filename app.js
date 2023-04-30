iniciar()
async function iniciar() {
    const mercadopago = require('mercadopago')
    mercadopago.configure({
        access_token: 'APP_USR-2054330377631815-121619-bee3aff0094b133893d961c373b5d9d7-1266113861'
    })
    
    const axios = require('axios')
    
    const paymentData = {
        description: 'testar!',
        transaction_amount: 1,
        payment_method_id: 'pix',
        payer: {
          email: 'emailrandol@gmail.com',
          first_name: `gustavo`,
        }
    }
    
    await mercadopago.payment.create(paymentData)
    .then(async function (payment) {
        axios.post('http://localhost:3000/enviarimg', {img64: `${payment.body.point_of_interaction.transaction_data.qr_code_base64}`})
        .then(async response => console.log('http://localhost:3000/imagem/' + response.data.tabCode))  
    })
}