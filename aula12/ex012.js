var Agora = new Date()
var hora = Agora.getHours()
var minuto = Agora.getMinutes()
var segundo = Agora.getSeconds()
console.log(`Agora são exatamente ${hora} horas, ${minuto} minutos e ${segundo} segundos.`)
if (hora < 12) {
    console.log ('Bom Dia!')
} else if (hora <= 18) {
    console.log('Boa Tarde!')
} else {
    console.log('Boa Noite!')
}
