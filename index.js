const dineroUsuario = document.getElementById('dineroUsurario');
const btnSolicitarPlata = document.getElementById('btnSolicitarPlata');
const imprimirDinero = document.getElementById('imprimir-billetes');
const errorCajero = document.getElementById('error-cajero');
const contenedorDineroBanco = document.getElementById('dinero-banco');

class Billete {
	constructor({ valor = 0, cantidad = 0, url }) {
		this.valor = valor;
		this.cantidad = cantidad;
		this.url = url;
		this.elementoHtml = `<img class="billete" src=${this.url} alt="imagen de un billete de ${this.valor}" />`;
	}
}

const billete100 = new Billete({
	valor: 100,
	cantidad: 8,
	url: './billete100.png',
});

const billete50 = new Billete({
	valor: 50,
	cantidad: 8,
	url: './billete50.png',
});

const billete20 = new Billete({
	valor: 20,
	cantidad: 6,
	url: './billete20.png',
});

const billete10 = new Billete({
	valor: 10,
	cantidad: 4,
	url: './billete10.png',
});

const billete5 = new Billete({
	valor: 5,
	cantidad: 10,
	url: './billete5.png',
});

const billete1 = new Billete({
	valor: 1,
	cantidad: 20,
	url: './billete1.png',
});

const cajaDeBilletes = [
	billete100,
	billete50,
	billete20,
	billete10,
	billete5,
	billete1,
];

let dineroDelBanco = cajaDeBilletes
	.map(billete => billete.valor * billete.cantidad)
	.reduce((previousValue, currentValue) => previousValue + currentValue);
contenedorDineroBanco.innerHTML = `Dinero del banco: ${dineroDelBanco}`;

let dineroAEntregar = [];
let dineroDelUsuario = 0;
let division = 0;
let papeles = 0;

btnSolicitarPlata.addEventListener('click', () => {
	let monto = dineroUsuario.value;
	if (monto.length === 0) {
		errorCajero.innerHTML = 'Por favor ingrese un monto';
	} else {
		errorCajero.innerHTML = '';
		dineroDelUsuario = parseInt(monto);
		hcaerTransaccion();
		contenedorDineroBanco.innerHTML = `dinero del banco: ${dineroDelBanco}`;
	}
});

function hcaerTransaccion() {
	if (dineroDelUsuario > dineroDelBanco) {
		errorCajero.textContent = 'Lo sentimos, no tenemos la cantidad solicitada.';
		imprimirDinero.innerHTML = '';
	} else {
		errorCajero.innerHTML = '';
		for (billete of cajaDeBilletes) {
			division = Math.floor(dineroDelUsuario / billete.valor);
			papeles = 0;
			if (division > billete.cantidad) {
				papeles = billete.cantidad;
			} else {
				papeles = division;
			}
			billete.cantidad -= division;
			if (Math.sign(billete.cantidad) === -1) {
				billete.cantidad = 0;
			}
			dineroAEntregar.push(
				new Billete({
					valor: billete.valor,
					cantidad: papeles,
				})
			);
			dineroDelUsuario = dineroDelUsuario - billete.valor * papeles;
		}

		dineroDelBanco = cajaDeBilletes
			.map(billete => billete.valor * billete.cantidad)
			.reduce((previousValue, currentValue) => previousValue + currentValue);

		for (plata of dineroAEntregar) {
			if (plata.cantidad > 0) {
				switch (plata.valor) {
					case 100:
						for (let i = 0; i < plata.cantidad; i++) {
							imprimirDinero.innerHTML += billete100.elementoHtml;
						}
						break;
					case 50:
						for (let i = 0; i < plata.cantidad; i++) {
							imprimirDinero.innerHTML += billete50.elementoHtml;
						}
						break;
					case 20:
						for (let i = 0; i < plata.cantidad; i++) {
							imprimirDinero.innerHTML += billete20.elementoHtml;
						}
						break;
					case 10:
						for (let i = 0; i < plata.cantidad; i++) {
							imprimirDinero.innerHTML += billete10.elementoHtml;
						}
						break;
					case 5:
						for (let i = 0; i < plata.cantidad; i++) {
							imprimirDinero.innerHTML += billete5.elementoHtml;
						}
						break;
					case 1:
						for (let i = 0; i < plata.cantidad; i++) {
							imprimirDinero.innerHTML += billete1.elementoHtml;
						}
						break;
				}
			}
		}
		dineroAEntregar = [];
	}
}
