"use client";

import { useState, useEffect } from "react";
import {
  Send,
  Map,
  Info,
  Bot,
  LoaderCircle,
  Eraser,
  ExternalLink,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ParcelInfo } from "@/components/parcel-info";

const url = `https://geoia.umpacto.com/api/openai/assistant`;
//const url = `http://localhost:3005/api/openai/assistant`;

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: string; content: { message: string } }[]
  >([]);
  const [input, setInput] = useState("");
  const [thread, setThread] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

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
          assistantId: "asst_yCVoVaCcrZ98xtAeclaGGGz7",
          question,
        },
      });
      setMessages(data.data.messages);
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };
  const cleanChat = async () => {
    setLoading(true);
    await getThread();
    setInput("");
    setLoading(false);
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
            Explore Cyprus
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Discover the beauty and history of Cyprus, the third largest island
            in the Mediterranean Sea, located at the crossroads of Europe, Asia
            and Africa.
          </p>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map container - takes 2/3 of the space on large screens */}
          <Card className="lg:col-span-2 shadow-md border-0">
            <CardHeader className="bg-purple-50 border-b">
              <CardTitle className="flex items-center text-purple-900">
                <Map className="w-5 h-5 mr-2" /> Cyprus Map
              </CardTitle>
              <CardDescription>Space to embed Google Maps</CardDescription>
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
                <Info className="w-5 h-5 mr-2" /> Information
              </CardTitle>
              <CardDescription>Interesting facts about Cyprus</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="turismo">Tourism</TabsTrigger>
                  <TabsTrigger value="cultura">Culture</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">
                      General Information
                    </h3>
                    <ul className="space-y-1 text-sm text-slate-700">
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Capital:</span>{" "}
                        Nicosia
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Population:</span>{" "}
                        Approx. 1.2 million
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Languages:</span>{" "}
                        Greek, Turkish (official)
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Currency:</span>{" "}
                        Euro (€)
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Area:</span> 9,251
                        km²
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">Geography</h3>
                    <p className="text-sm text-slate-700">
                      Cyprus is located in the eastern Mediterranean Sea, south
                      of Turkey and west of Syria and Lebanon. The island has
                      two mountain ranges: Troodos and Pentadaktylos.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="turismo" className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">
                      Popular Destinations
                    </h3>
                    <ul className="space-y-1 text-sm text-slate-700">
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Ayia Napa:</span>{" "}
                        Famous for its beaches and nightlife
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Paphos:</span>{" "}
                        UNESCO World Heritage archaeological site
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Limassol:</span>{" "}
                        Coastal city with medieval castle
                      </li>
                      <li className="flex items-start">
                        <span className="font-semibold mr-2">Nicosia:</span> The
                        last divided capital in Europe
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">Activities</h3>
                    <p className="text-sm text-slate-700">
                      Cyprus offers a wide variety of activities, from diving
                      and water sports to hiking in the Troodos mountains and
                      visits to traditional vineyards.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="cultura" className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">History</h3>
                    <p className="text-sm text-slate-700">
                      With over 10,000 years of history, Cyprus has been
                      influenced by many civilizations, including Minoans,
                      Mycenaeans, Phoenicians, Assyrians, Egyptians, Persians,
                      Romans, Byzantines, Crusaders, Venetians, Ottomans and
                      British.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-purple-900">Gastronomy</h3>
                    <p className="text-sm text-slate-700">
                      Cypriot cuisine is a mix of Greek and Turkish influences.
                      Typical dishes include meze, souvlaki, halloumi
                      (traditional cheese) and sweets like baklava.
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
                The capital and largest city of Cyprus, divided between the
                Greek Cypriot and Turkish Cypriot administrations.
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
                Main port and tourist center with a beautiful promenade and a
                medieval castle in the historic center.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-purple-900">Paphos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Coastal city with important archaeological sites, including
                Roman mosaics and the Tombs of the Kings.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-purple-900">Larnaca</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Port city with the main international airport, famous for the
                Church of Saint Lazarus and the salt lake.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating button to open chat */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-purple-600 hover:bg-purple-700"
            aria-label="Open chat"
          >
            <Bot className="h-12 w-12" />
          </Button>
        </SheetTrigger>
        {/* Make sure SheetContent has a defined height */}
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>
              Search Assistant
              <Button
                className="ml-2"
                variant="ghost"
                onClick={() => cleanChat()}
                aria-label="Close"
              >
                <Eraser className="text-red-700" />
              </Button>
            </SheetTitle>
          </SheetHeader>

          {/* This div should be flex and take up all available space */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* The message area should have flex-1 to expand and overflow-y-auto for scrolling */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 my-8">
                  <p>Hello! I'll help you with your next real estate search.</p>
                </div>
              )}

              {messages.map((message: any, index: number) => {
                return (
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
                      {message?.content?.data && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs flex items-center gap-1 bg-white hover:bg-purple-50"
                            onClick={() => {
                              setModalOpen(true);
                              setModalData(
                                message.content.data?.propertyDetails || null
                              );
                            }}
                          >
                            <ExternalLink className="h-3 w-3" />
                            View detailed information
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The form should stay at the bottom */}
            <form onSubmit={handleSubmit} className="border-t p-2 flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me something..."
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md h-[500px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Location Details</DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 px-1">
            <DialogDescription asChild>
              <div>{modalData && <ParcelInfo data={modalData} />}</div>
            </DialogDescription>
          </div>

          <DialogFooter className="pt-4">
            <Button
              onClick={() => {
                setModalOpen(false);
                setModalData(null);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
