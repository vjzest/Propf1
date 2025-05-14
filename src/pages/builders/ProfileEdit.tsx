import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Building2, MapPin, Phone, Mail, Calendar, Award, Briefcase, Globe, Star, Users, DollarSign, Target, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface BuilderProfileData {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  registrationNumber: string;
  website: string;
  about: string;
  profileImage: string;
  yearsOfExperience: number;
  completedProjects: number;
  totalRevenue: string;
  activeProjects: number;
  teamSize: number;
  specialties: string[];
  certifications: string[];
  awards: string[];
}

const defaultProfile: BuilderProfileData = {
  companyName: "",
  email: "",
  phone: "",
  address: "",
  registrationNumber: "",
  website: "",
  about: "",
  profileImage: "",
  yearsOfExperience: 0,
  completedProjects: 0,
  totalRevenue: "",
  activeProjects: 0,
  teamSize: 0,
  specialties: [],
  certifications: [],
  awards: [],
};

const BuilderProfileEdit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<BuilderProfileData>(defaultProfile);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newAward, setNewAward] = useState("");

  // Load profile data from API when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/builder/profile/data');
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to fetch profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (field: keyof BuilderProfileData, value: string | number | string[]) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await fetch('/api/builder/profile/update', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(prev => ({
          ...prev,
          profileImage: data.profileImage
        }));
        toast({
          title: "Success",
          description: "Profile image updated successfully",
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim()) {
      setProfile(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setProfile(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setProfile(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification("");
    }
  };

  const handleRemoveCertification = (certification: string) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== certification)
    }));
  };

  const handleAddAward = () => {
    if (newAward.trim()) {
      setProfile(prev => ({
        ...prev,
        awards: [...prev.awards, newAward.trim()]
      }));
      setNewAward("");
    }
  };

  const handleRemoveAward = (award: string) => {
    setProfile(prev => ({
      ...prev,
      awards: prev.awards.filter(a => a !== award)
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/builder/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully",
        });
        navigate('/builder/profile');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Company Profile</h2>
          <p className="text-muted-foreground">
            Update your company information and credentials.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate('/builder/profile')}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Profile Image Section */}
      <div className="flex items-center gap-6 p-4 bg-muted rounded-lg">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile.profileImage} />
          <AvatarFallback>{profile.companyName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{profile.companyName}</h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="profile-image"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('profile-image')?.click()}
            size="sm"
          >
            <Upload className="mr-2 h-4 w-4" />
            Change Image
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Company Information Form */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <Input
                value={profile.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                type="email"
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={profile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Textarea
                value={profile.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter company address"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Registration Number</label>
              <Input
                value={profile.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                placeholder="Enter registration number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Website</label>
              <Input
                value={profile.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="Enter website URL"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">About</label>
              <Textarea
                value={profile.about}
                onChange={(e) => handleInputChange('about', e.target.value)}
                placeholder="Enter company description"
              />
            </div>
          </CardContent>
        </Card>

        {/* Company Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Company Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Years of Experience</p>
                  <Input
                    type="number"
                    value={profile.yearsOfExperience}
                    onChange={(e) => handleInputChange('yearsOfExperience', parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Completed Projects</p>
                  <Input
                    type="number"
                    value={profile.completedProjects}
                    onChange={(e) => handleInputChange('completedProjects', parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <Input
                    value={profile.totalRevenue}
                    onChange={(e) => handleInputChange('totalRevenue', e.target.value)}
                    className="w-32"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <Input
                    type="number"
                    value={profile.activeProjects}
                    onChange={(e) => handleInputChange('activeProjects', parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <Input
                    type="number"
                    value={profile.teamSize}
                    onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                  >
                    {specialty}
                    <button
                      onClick={() => handleRemoveSpecialty(specialty)}
                      className="text-primary hover:text-primary/70"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Add new specialty"
                  className="flex-1"
                />
                <Button onClick={handleAddSpecialty}>Add</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Certifications</h3>
              <div className="space-y-2">
                {profile.certifications.map((certification, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="flex-1">{certification}</span>
                    <button
                      onClick={() => handleRemoveCertification(certification)}
                      className="text-primary hover:text-primary/70"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="Add new certification"
                  className="flex-1"
                />
                <Button onClick={handleAddCertification}>Add</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Awards & Recognition</h3>
              <div className="space-y-2">
                {profile.awards.map((award, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="flex-1">{award}</span>
                    <button
                      onClick={() => handleRemoveAward(award)}
                      className="text-primary hover:text-primary/70"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newAward}
                  onChange={(e) => setNewAward(e.target.value)}
                  placeholder="Add new award"
                  className="flex-1"
                />
                <Button onClick={handleAddAward}>Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuilderProfileEdit; 