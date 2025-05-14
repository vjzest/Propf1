import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Building2, Star, Calendar, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BASE_URL = 'http://localhost:4000';

const EnquiryViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [enquiry, setEnquiry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/v1/contact/getContact/${id}`);
        const data = await response.json();

        if (data.success) {
          setEnquiry(data.contact);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch enquiry details",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error fetching enquiry:', error);
        toast({
          title: "Error",
          description: "Failed to fetch enquiry. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiry();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Enquiry not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/enquiries')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Enquiries
        </Button>
        <h1 className="text-2xl font-bold">Enquiry Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enquiry Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{enquiry.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{enquiry.phone || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Message Details</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">{enquiry.subject || 'No subject'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Message</p>
                  <p className="mt-1">{enquiry.message}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Status</h3>
              <Badge variant={
                enquiry.status === 'New' ? 'default' :
                enquiry.status === 'In Progress' ? 'secondary' :
                'outline'
              }>
                {enquiry.status || 'New'}
              </Badge>
            </div>

            <div>
              <h3 className="font-medium mb-2">Date</h3>
              <p>{new Date(enquiry.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnquiryViewPage; 