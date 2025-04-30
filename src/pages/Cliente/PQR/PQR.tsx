import React, { useState } from "react";
import GenerarPQR from "./GenerarPQR";

interface Section {
  title: string;
  content: string;
}

const sections: Section[] = [
  {
    title: "1. PARTES DEL CONTRATO",
    content: `Por un lado, CASH IMPORTACIONES E INVERSIONES. sociedad comercial, identificada con NIT. 901.374.694-4, debidamente constituida bajo las leyes de Colombia y domiciliada en la dirección Calle 25 # 1E -85 barrio chaparral, los patios, actúa como el VENDEDOR, en adelante “CASH”; y por el otro, el Cliente, mayor de edad, quien podrá actuar en nombre propio (persona natural) o como representante legal de una sociedad (persona jurídica), como el COMPRADOR, en adelante “el Cliente”.
    
    Cash, presumirá de buena fe que está contratando directamente con el Cliente mayor de edad o con su representante legal debidamente facultado, por lo que Cash no asumirá responsabilidad alguna en caso de suplantación.`,
  },
  {
    title: "2. OBJETO Y ÁMBITO DE APLICACIÓN",
    content: `Los presentes, constituyen los términos y las condiciones que se deberán tener en cuenta por los Clientes para las compras que realicen en el sitio web https://tekcam-frontend.vercel.app/cliente O Tienda Online o por canales de comercio electrónico tales como WhatsApp -en lo que sea aplicable de los productos que comercializa Cash.
    
    Se entenderán como productos los elementos, accesorios y repuestos que se comercializan en https://tekcam-frontend.vercel.app/cliente o Tienda Online o por canales de comercio electrónico tales como WhatsApp -en lo que sea aplicable. Los términos y condiciones aquí descritos les serán aplicables de manera indistinta a la totalidad de productos, salvo que se indique expresamente lo contrario, caso en el cual se establecerán las condiciones especiales para la comercialización de cada tipo de producto.`,
  },
  {
    title: "3. ACLARACIONES IMPORTANTES",
    content: `Antes de realizar la compra de tu producto en Cash deberás tener en cuenta lo siguiente:
    - Para realizar cualquier compra, es requisito esencial que el Cliente registre su correo electrónico, se identifique, y diligencie la información para el envío del/los productos adquiridos.
    - Estos términos podrán ser modificados o adicionados por Cash en el futuro.
    - La venta de los productos ofertados y publicados y comercializados por Cash está sujeta a disponibilidad de inventario y cobertura geográfica.`,
  },
  {
    title: "4. PRECIO",
    content: `El precio de los productos ofrecidos en esta página web, Tienda Online o por canales de comercio electrónico tales como WhatsApp está compuesto de los siguientes conceptos a cargo del Cliente: valor del producto e impuestos. Los precios ofrecidos incluyen IVA.`,
  },
  {
    title: "5. MEDIOS Y CONDICIONES DE PAGO",
    content: `Los pagos podrán efectuarse por los siguientes medios:
    - Tarjeta de crédito: VISA, Diners, Master Card, American Express.
    - Tarjetas débito: Maestro, Electrón.
    - Efectivo: Efecty, Super giros.
    - Transferencias bancarias y otros medios digitales.`,
  },
  {
    title: "6. ENVÍOS Y ENTREGA DE LOS PRODUCTOS",
    content: `Los productos serán entregados en el domicilio que el Cliente registre al momento de la compra, dentro de un plazo máximo de veinte (20) días hábiles.`,
  },
  {
    title: "7. DERECHO DE RETRACTO",
    content: `El Cliente podrá ejercer el derecho de retracto dentro de los cinco (5) días calendario siguientes a la entrega del producto, siempre y cuando el artículo no haya sido manipulado ni usado.`,
  },
  {
    title: "8. REVERSIÓN DEL PAGO",
    content: `El Cliente podrá solicitar la reversión del pago en los siguientes casos:
    - Si es objeto de fraude.
    - Si el producto adquirido no fue recibido o no corresponde al solicitado.`,
  },
  {
    title: "9. GARANTÍAS",
    content: `Todos los productos comercializados por Cash cuentan con un término de garantía de tres (03) meses.`,
  },
  {
    title: "10. CAMBIOS Y DEVOLUCIONES",
    content: `Los cambios y devoluciones únicamente se realizarán en casos de reclamaciones por garantía, derecho de retracto o reversión del pago.`,
  },
  {
    title: "11. CANALES DE ATENCIÓN AL CLIENTE",
    content: `Líneas telefónicas: +57 313 2215688
    Correo electrónico: tekcam.store@gmail.com
    Chat y WhatsApp: +57 3013842551`,
  },
];

const PQR: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <section className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">TEKCAM PQR </h1>
      <GenerarPQR   />
      {sections.map((section, index) => (
        <div
          key={index}
          className="border-b py-4 cursor-pointer"
          onClick={() => toggleSection(index)}
        >
          <h2 className="text-xl font-medium flex justify-between items-center">
            {section.title}
            <span>{openSection === index ? "-" : "+"}</span>
          </h2>
          {openSection === index && (
            <p className="mt-4 text-gray-600">{section.content}</p>
          )}
        </div>
      ))}
    </section>
  );
};

export default PQR;
