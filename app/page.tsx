"use client";

import { useState, useEffect } from "react";
import { Send, Map, Info, Bot, LoaderCircle, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_API_URL}/openai/assistant`;

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: string; content: { message: string } }[]
  >([]);
  const [input, setInput] = useState("");
  const [thread, setThread] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getThread();
  }, []);

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const getThread = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${url}/thread`,
      });
      setThread(data.data.threadId);
      setMessages([]);
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };
  const executeIA = async (question: string) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${url}/query`,
        data: {
          threadId: thread,
          assistantId: "asst_DCmpV0IwvP9qPCf4Wa0aKnaX",
          question,
        },
      });
      setMessages(data.data.messages);
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!input) return;
    setMessages([
      ...messages,
      {
        role: "user",
        content: { message: input },
      },
    ]);
    const auxInput = input + "";
    setInput("");
    setLoading(true);
    await executeIA(auxInput);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
            Explora Chipre
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Descubre la belleza y la historia de Chipre, la tercera isla más
            grande del Mar Mediterráneo, ubicada en la encrucijada de Europa,
            Asia y África.
          </p>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map container - takes 2/3 of the space on large screens */}
          <Card className="lg:col-span-2 shadow-md border-0">
            <CardHeader className="bg-purple-50 border-b">
              <CardTitle className="flex items-center text-purple-900">
                <Map className="w-5 h-5 mr-2" /> Mapa de Chipre
              </CardTitle>
              <CardDescription>
                Espacio para embeber Google Maps
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d834946.9630632942!2d33.425200000000004!3d35.168800000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1767ca494d55%3A0x324c3c807fc4146e!2sChipre!5e0!3m2!1ses!2sec!4v1744773151929!5m2!1ses!2sec"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </CardContent>
          </Card>

          {/* Information sidebar */}
          <Card className="shadow-md border-0">
            <CardHeader className="bg-purple-50 border-b">
              <CardTitle className="flex items-center text-purple-900">
                <Info className="w-5 h-5 mr-2" /> Información
              </CardTitle>
              <CardDescription>Datos interesantes sobre Chipre</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="turismo">Turismo</TabsTrigger>
                  <TabsTrigger value="cultura">Cultura</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">
                      Datos Generales
                    </h3>
                    <ul className="space-y-1 text-sm text-slate-700">
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Capital:</span>{" "}
                        Nicosia
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Población:</span>{" "}
                        Aprox. 1.2 millones
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Idiomas:</span>{" "}
                        Griego, Turco (oficiales)
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Moneda:</span> Euro
                        (€)
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Superficie:</span>{" "}
                        9,251 km²
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">Geografía</h3>
                    <p className="text-sm text-slate-700">
                      Chipre está situada en el extremo oriental del Mar
                      Mediterráneo, al sur de Turquía y al oeste de Siria y
                      Líbano. La isla cuenta con dos cadenas montañosas: Troodos
                      y Pentadaktylos.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="turismo" className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">
                      Destinos Populares
                    </h3>
                    <ul className="space-y-1 text-sm text-slate-700">
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Ayia Napa:</span>{" "}
                        Famosa por sus playas y vida nocturna
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Paphos:</span>{" "}
                        Sitio arqueológico Patrimonio de la UNESCO
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Limassol:</span>{" "}
                        Ciudad costera con castillo medieval
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Nicosia:</span> La
                        última capital dividida de Europa
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">Actividades</h3>
                    <p className="text-sm text-slate-700">
                      Chipre ofrece una gran variedad de actividades, desde
                      buceo y deportes acuáticos hasta senderismo en las
                      montañas Troodos y visitas a viñedos tradicionales.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="cultura" className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">Historia</h3>
                    <p className="text-sm text-slate-700">
                      Con más de 10,000 años de historia, Chipre ha sido
                      influenciada por muchas civilizaciones, incluyendo
                      minoicos, micénicos, fenicios, asirios, egipcios, persas,
                      romanos, bizantinos, cruzados, venecianos, otomanos y
                      británicos.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">Gastronomía</h3>
                    <p className="text-sm text-slate-700">
                      La cocina chipriota es una mezcla de influencias griegas y
                      turcas. Platos típicos incluyen meze, souvlaki, halloumi
                      (queso tradicional) y dulces como el baklava.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Additional information cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-purple-900">Nicosia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                La capital y ciudad más grande de Chipre, dividida entre las
                administraciones grecochipriota y turcochipriota.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-purple-900">
                Limassol
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Principal puerto y centro turístico con un hermoso paseo
                marítimo y un castillo medieval en el centro histórico.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-purple-900">Paphos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Ciudad costera con importantes yacimientos arqueológicos,
                incluidos mosaicos romanos y las Tumbas de los Reyes.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-purple-900">Larnaca</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Ciudad portuaria con el principal aeropuerto internacional,
                famosa por la iglesia de San Lázaro y el lago salado.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botón flotante para abrir el chat */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-purple-600 hover:bg-purple-700"
            aria-label="Abrir chat"
          >
            <Bot className="h-12 w-12" />
          </Button>
        </SheetTrigger>
        {/* Asegúrate de que SheetContent tenga una altura definida */}
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>
              Chat de IA sobre Chipre <Eraser />
            </SheetTitle>
          </SheetHeader>

          {/* Este div debe ser flex y ocupar todo el espacio disponible */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* El área de mensajes debe tener flex-1 para expandirse y overflow-y-auto para scroll */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 my-8">
                  <p>¡Hola! Te ayudaré en tu siguiente inmobiliario.</p>
                </div>
              )}

              {messages.map((message: any, index: number) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.content.message}
                  </div>
                </div>
              ))}
            </div>

            {/* El formulario debe mantenerse en la parte inferior */}
            <form onSubmit={handleSubmit} className="border-t p-2 flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Preguntame algo..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={loading}>
                {!loading ? (
                  <Send className="h-4 w-4" />
                ) : (
                  <LoaderCircle
                    className="h-4 w-4 animate-spin"
                    aria-label="Loading..."
                  />
                )}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
}
