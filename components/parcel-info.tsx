import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, MapPin, LandmarkIcon } from "lucide-react";

interface ParcelInfoProps {
  data: any[];
}

export function ParcelInfo({ data }: ParcelInfoProps) {
  // Validar que data existe y es un array
  console.log("ParcelInfo data:", data);
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          No information available for this parcel.
        </AlertDescription>
      </Alert>
    );
  }

  // Extraer el primer elemento del array
  const parcelData = data[0];

  // Validar que parcelData tiene las propiedades necesarias
  if (!parcelData.properties) {
    return (
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          The parcel information is incomplete.
        </AlertDescription>
      </Alert>
    );
  }

  const properties = parcelData.properties;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-purple-900 flex items-center">
          <LandmarkIcon className="h-5 w-5 mr-2" />
          Parcel {properties.parcel_nbr || "N/A"}
        </h3>
        <Badge variant="outline" className="bg-purple-50">
          {properties.vil_nm_e || "N/A"}
        </Badge>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">General Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <dl className="grid grid-cols-2 gap-2">
                <dt className="font-medium text-slate-700">Parcel Number:</dt>
                <dd>{properties.parcel_nbr || "N/A"}</dd>

                <dt className="font-medium text-slate-700">Area:</dt>
                <dd>
                  {properties.dls_parcel_area
                    ? `${properties.dls_parcel_area} m²`
                    : "N/A"}
                </dd>

                <dt className="font-medium text-slate-700">Plans:</dt>
                <dd>{properties.plans || "N/A"}</dd>

                <dt className="font-medium text-slate-700">Sheet:</dt>
                <dd>{properties.sheet || "N/A"}</dd>

                <dt className="font-medium text-slate-700">Registration:</dt>
                <dd>{properties.pr_registration_no || "N/A"}</dd>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Location</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <dl className="grid grid-cols-2 gap-2">
                <dt className="font-medium text-slate-700">Village:</dt>
                <dd>
                  {properties.vil_nm_e || "N/A"} ({properties.vil_nm_g || "N/A"}
                  )
                </dd>

                <dt className="font-medium text-slate-700">District:</dt>
                <dd>
                  {properties.dist_nm_e || "N/A"} (
                  {properties.dist_nm_g || "N/A"})
                </dd>

                <dt className="font-medium text-slate-700">Zone:</dt>
                <dd>{properties.plzone || "N/A"}</dd>

                <dt className="font-medium text-slate-700">Coordinates:</dt>
                <dd className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-purple-600" />
                  {properties.x && properties.y
                    ? `${properties.x.toFixed(6)}, ${properties.y.toFixed(6)}`
                    : "N/A"}
                </dd>
              </dl>
            </CardContent>
          </Card>

          {parcelData.geometry && (
            <div className="bg-slate-100 p-3 rounded-md">
              <p className="text-xs text-slate-500 mb-2">Parcel polygon:</p>
              <div className="bg-white p-2 rounded border border-slate-200 overflow-x-auto">
                <pre className="text-xs text-slate-700">
                  {JSON.stringify(parcelData.geometry.coordinates, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Pricing Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <dl className="grid grid-cols-2 gap-2">
                <dt className="font-medium text-slate-700">Base Price 1:</dt>
                <dd className="font-semibold text-purple-700">
                  {properties.prc_price_base1 || "N/A"} €
                </dd>

                <dt className="font-medium text-slate-700">Base Price 2:</dt>
                <dd className="font-semibold text-purple-700">
                  {properties.prc_price_base2 || "N/A"} €
                </dd>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
