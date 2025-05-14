import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Globe, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ViewBuilder = () => {
  const { id } = useParams();
  const [builder, setBuilder] = useState<any>(null);

  useEffect(() => {
    // Get builder data from localStorage, ensuring it doesn't get reset
    const profileData = localStorage.getItem("profileData");
    if (profileData) {
      setBuilder(JSON.parse(profileData));
    }
  }, [id]);

  if (!builder) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">Loading...</div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Builder Information Card */}
            <Card className="md:col-span-1">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-3">
                    {builder.profileImage ? (
                      <img
                        src={builder.profileImage}
                        alt={builder.name || "Builder"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="w-full h-full bg-blue-500 text-white flex items-center justify-center text-xl font-semibold">
                              ${builder.name?.charAt(0).toUpperCase()}
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-500 text-white flex items-center justify-center text-xl font-semibold">
                        {builder.name?.charAt(0).toUpperCase() || "B"}
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      {builder.name || "Unknown Builder"}
                    </CardTitle>
                    <Badge className="mt-2">{builder.category || "N/A"}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{builder.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{builder.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{builder.location || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <a
                      href={`https://${builder.website || ""}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {builder.website || "N/A"}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{builder.rating || 0} Rating</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Builder Details Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>About {builder.name || "Builder"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-gray-600">
                    {builder.about || "No information available"}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">
                        {builder.experience || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Team Size</p>
                      <p className="font-medium">
                        {builder.teamSize || "N/A"} Members
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        Completed Projects
                      </p>
                      <p className="font-medium">
                        {builder.completedProjects || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Current Projects</p>
                      <p className="font-medium">
                        {builder.currentProjects || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {builder.specialties?.map(
                        (specialty: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        )
                      ) || "N/A"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {builder.certifications?.map(
                        (certification: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {certification}
                          </Badge>
                        )
                      ) || "N/A"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        Average Project Size
                      </p>
                      <p className="font-medium">
                        {builder.averageProjectSize || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Total Value Built</p>
                      <p className="font-medium">
                        {builder.totalValueBuilt || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ViewBuilder;
