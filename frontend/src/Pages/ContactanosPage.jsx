import {
  MailIcon,
  PhoneIcon,
  LocationMarkerIcon,
  ClockIcon,
} from "@heroicons/react/solid";

const ContactanosPage = () => {
  return (
    <div className="min-h-screen  py-12 pt-20  ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8  fade-in slide-up-2">
        <div className="bg-white overflow-hidden shadow rounded-lg ">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-semibold text-blue-800 mb-2">
              Contáctanos
            </h1>
            <p className="text-blue-600">
              ¿Tienes alguna pregunta o comentario? ¡Estamos aquí para ayudarte!
            </p>
          </div>
          <div className="border-t border-blue-200">
            <dl>
              <div className="bg-blue-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="flex items-center">
                  <MailIcon className="h-6 w-6 text-blue-600 mr-3" />
                  <dt className="text-sm font-medium text-gray-500">
                    Correo Electrónico
                  </dt>
                </div>
                <dt className="sr-only  ">Email</dt>
                
                
                <dd className="mt-1 text-sm  text-gray-900 sm:col-span-2">
                  corporacion.cormudi@gmail.com
                  <a
                    className="ml-10 text-blue-600 hover:-scale-110"
                    href="mailto:corporacion.cormudi@gmail.com  "
                  >
                    Enviar correo &#x1F4E9;
                   
                  </a>

                   

                </dd>


              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="flex items-center">
                  <PhoneIcon className="h-6 w-6 text-blue-600 mr-3" />
                  <dt className="text-sm font-medium text-gray-500">
                    Teléfono
                  </dt>
                </div>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  300 8721907 - 3116125350
                </dd>
              </div>
              <div className="bg-blue-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="flex items-center">
                  <LocationMarkerIcon className="h-6 w-6 text-blue-600 mr-3" />
                  <dt className="text-sm font-medium text-gray-500">
                    Dirección
                  </dt>
                </div>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  Bello, Antioquia
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="flex items-center">
                  <ClockIcon className="h-6 w-6 text-blue-600 mr-3" />
                  <dt className="text-sm font-medium text-gray-500">
                    Horario de Atención
                  </dt>
                </div>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  Lunes a Viernes: 9am - 6pm
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 fade-in slide-up-2 ">
        <div className="bg-white overflow-hidden shadow rounded-lg ">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Ubicación
            </h2>
            <p className="text-blue-600">Encuéntranos en el mapa:</p>
          </div>
          <div className="border-t border-blue-200">
            <div className="aspect-w-16 aspect-h-9">
              {/* Inserta aquí el mapa de Google */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63447.67072271301!2d-75.59414134845987!3d6.331878426296025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e442fa6958e1777%3A0x837c07a666cf50f0!2sBello%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1710734262007!5m2!1ses!2sco"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full rounded-md"
                title="Mapa de Google"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactanosPage;
