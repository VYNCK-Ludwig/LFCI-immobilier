'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Facebook, User, Phone, Bed, Bath, Square, MapPin, Shield, Zap, Upload, X, Check, Mail, Home as HomeIcon, ArrowLeft } from 'lucide-react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Château de luxe avec jardin'
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Manoir élégant en pierre'
  },
  {
    url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Villa moderne avec vue'
  }
];

interface Admin {
  id: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  photo: string;
}

interface Property {
  id: string;
  title: string;
  type: 'maison' | 'appartement';
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  surface: number;
  dpe: string;
  ges: string;
  image: string;
  images?: string[];
  description?: string;
  features?: string[];
  addedBy?: string;
}

const admins: Admin[] = [
  {
    id: 'ludwig',
    name: 'Ludwig',
    password: 'Kooligan011.',
    email: 'ludwig.vynck@expfrance.fr',
    phone: '06.83.93.41.67',
    photo: '/Ludo.jpg'
  },
  {
    id: 'frederic',
    name: 'Frédéric',
    password: 'Fred87100.',
    email: 'frederic.autef@expfrance.fr',
    phone: '+33 5 55 65 43 21',
    photo: '/Frederic.png'
  }
];

const initialProperties: Property[] = [
  {
    id: '1',
    title: 'Château de Caractère',
    type: 'maison',
    location: 'Guéret, Creuse',
    price: 650000,
    bedrooms: 6,
    bathrooms: 3,
    surface: 400,
    dpe: 'C',
    ges: 'D',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: "Magnifique château du 18ème siècle entièrement rénové avec des matériaux d'exception. Cette propriété d'exception offre des prestations haut de gamme dans un cadre idyllique. Située dans un parc paysager de 2 hectares, elle bénéficie d'une vue imprenable sur la vallée.",
    features: ['Parc de 2 hectares', 'Cave à vin', 'Système de sécurité', 'Garage 4 voitures', 'Piscine chauffée', 'Climatisation'],
    addedBy: 'ludwig'
  },
  {
    id: '2',
    title: 'Maison Bourgeoise',
    type: 'maison',
    location: 'Moulins, Allier',
    price: 420000,
    bedrooms: 4,
    bathrooms: 2,
    surface: 280,
    dpe: 'B',
    ges: 'C',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: "Élégante maison bourgeoise de charme située en centre-ville. Rénovée avec goût en conservant l'authenticité des matériaux nobles. Idéale pour une famille recherchant le confort moderne dans un cadre historique.",
    features: ['Centre-ville', 'Jardin paysager', 'Cheminées d\'époque', 'Garage 2 voitures', 'Terrasse', 'Cave'],
    addedBy: 'frederic'
  },
  {
    id: '3',
    title: 'Propriété Viticole',
    type: 'maison',
    location: 'Tulle, Corrèze',
    price: 890000,
    bedrooms: 5,
    bathrooms: 4,
    surface: 350,
    dpe: 'A',
    ges: 'B',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522444195799-478538b28823?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: "Exceptional domaine viticole avec chai moderne et équipements dernière génération. Production de vins AOC reconnue internationalement. Propriété de prestige incluant habitation principale et locaux d'exploitation.",
    features: ['Vignoble 15 hectares', 'Chai moderne', 'Cave de dégustation', 'Hangar agricole', 'Piscine à débordement', 'Vue panoramique'],
    addedBy: 'ludwig'
  }
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentPage, setCurrentPage] = useState<'home' | 'properties' | 'admin' | 'property-detail'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    title: '',
    type: 'maison',
    location: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    surface: 0,
    dpe: 'A',
    ges: 'A',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: '',
    features: []
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [useCustomImage, setUseCustomImage] = useState(false);
  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string>('');
  const [detailCurrentImage, setDetailCurrentImage] = useState(0);

  // ✅ Nouvelle fonction ajoutée ici
  const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const previews: string[] = [];

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        previews.push(result);

        if (previews.length === files.length) {
          setPropertyImages(prev => [...prev, ...previews]);

          if (!useCustomImage || imagePreview === '') {
            setImagePreview(previews[0]);
            setNewProperty({ ...newProperty, image: previews[0] });
            setUseCustomImage(true);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        setShowPasswordModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextDetailImage = () => {
    if (selectedProperty?.images) {
      setDetailCurrentImage((prev) => (prev + 1) % selectedProperty.images!.length);
    }
  };

  const prevDetailImage = () => {
    if (selectedProperty?.images) {
      setDetailCurrentImage((prev) => (prev - 1 + selectedProperty.images!.length) % selectedProperty.images!.length);
    }
  };

  const handleLoginSubmit = () => {
    const admin = admins.find(a =>
      a.name.toLowerCase() === loginForm.username.toLowerCase() &&
      a.password === loginForm.password
    );

    if (admin) {
      setCurrentAdmin(admin);
      setIsAdminMode(true);
      setCurrentPage('admin');
      setShowPasswordModal(false);
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Nom d\'utilisateur ou mot de passe incorrect');
      setLoginForm({ username: '', password: '' });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setPropertyImages(prev => [...prev, result]);

          // La première image devient l'image principale
          if (index === 0 || propertyImages.length === 0) {
            setImagePreview(result);
            setNewProperty({ ...newProperty, image: result });
            setUseCustomImage(true);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeCustomImage = (imageToRemove?: string) => {
    if (imageToRemove) {
      // Supprimer une image spécifique
      const updatedImages = propertyImages.filter(img => img !== imageToRemove);
      setPropertyImages(updatedImages);

      // Si c'était l'image principale, prendre la première des restantes
      if (imageToRemove === imagePreview) {
        if (updatedImages.length > 0) {
          setImagePreview(updatedImages[0]);
          setNewProperty({ ...newProperty, image: updatedImages[0] });
        } else {
          setImagePreview('');
          setUseCustomImage(false);
          setNewProperty({ ...newProperty, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' });
        }
      }
    } else {
      // Supprimer toutes les images
      setImagePreview('');
      setUseCustomImage(false);
      setPropertyImages([]);
      setNewProperty({ ...newProperty, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' });
    }
  };

  const handleAddProperty = () => {
    if (newProperty.title && newProperty.location && newProperty.price && currentAdmin) {
      const property: Property = {
        id: Date.now().toString(),
        title: newProperty.title!,
        type: newProperty.type!,
        location: newProperty.location!,
        price: newProperty.price!,
        bedrooms: newProperty.bedrooms!,
        bathrooms: newProperty.bathrooms!,
        surface: newProperty.surface!,
        dpe: newProperty.dpe!,
        ges: newProperty.ges!,
        image: newProperty.image!,
        images: propertyImages.length > 0 ? propertyImages : [newProperty.image!],
        description: newProperty.description || '',
        features: newProperty.features || [],
        addedBy: currentAdmin.id
      };

      setProperties([...properties, property]);
      setIsAdminMode(false);
      setCurrentAdmin(null);
      setCurrentPage('properties');
      setNewProperty({
        title: '',
        type: 'maison',
        location: '',
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        surface: 0,
        dpe: 'A',
        ges: 'A',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '',
        features: []
      });
      setImagePreview('');
      setUseCustomImage(false);
    }
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setDetailCurrentImage(0);
    setCurrentPage('property-detail');
  };

  const getDpeColor = (grade: string) => {
    const colors: { [key: string]: string } = {
      'A': 'bg-green-500',
      'B': 'bg-green-400',
      'C': 'bg-yellow-500',
      'D': 'bg-orange-500',
      'E': 'bg-red-400',
      'F': 'bg-red-500',
      'G': 'bg-red-600'
    };
    return colors[grade] || 'bg-gray-500';
  };

  const getAdminForProperty = (propertyId: string): Admin | null => {
    const property = properties.find(p => p.id === propertyId);
    if (!property?.addedBy) return null;
    return admins.find(a => a.id === property.addedBy) || null;
  };

  // Property Detail Page
  if (currentPage === 'property-detail' && selectedProperty) {
    const adminInfo = getAdminForProperty(selectedProperty.id);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with back button */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
            <button
              onClick={() => setCurrentPage('properties')}
              className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux biens
            </button>
            <h1 className="text-2xl font-bold text-blue-600">
              Ludwig&Frédéric Immobilier
            </h1>
          </div>
        </div>

        {/* Property Detail Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Image Carousel */}
          <div className="relative mb-8">
            <div className="h-96 rounded-lg overflow-hidden">
              {selectedProperty.images && selectedProperty.images.length > 0 ? (
                <div className="relative h-full">
                  <img
                    src={selectedProperty.images[detailCurrentImage]}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => {
                      const image = selectedProperty.images?.[detailCurrentImage];
                      if (image) {
                        setZoomedImage(image);
                        setShowImageZoom(true);
                    }}
                    }
                  />
                  {selectedProperty.images.length > 1 && (
                    <>
                      <button
                        onClick={prevDetailImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      >
                        <ChevronLeft className="h-6 w-6 text-gray-800" />
                      </button>
                      <button
                        onClick={nextDetailImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      >
                        <ChevronRight className="h-6 w-6 text-gray-800" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {selectedProperty.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setDetailCurrentImage(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === detailCurrentImage
                                ? 'bg-yellow-500 scale-125'
                                : 'bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title and Location */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedProperty.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{selectedProperty.location}</span>
                </div>
                <div className="text-4xl font-bold text-orange-500 mb-6">
                  {selectedProperty.price.toLocaleString()} €
                </div>
              </div>

              {/* Property Stats */}
              <div className="flex space-x-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <Bed className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{selectedProperty.bedrooms}</div>
                  <div className="text-blue-600 font-medium">Chambres</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <Bath className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{selectedProperty.bathrooms}</div>
                  <div className="text-blue-600 font-medium">Salles de bain</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <Square className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{selectedProperty.surface} m²</div>
                  <div className="text-blue-600 font-medium">Surface</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {selectedProperty.description || "Description non disponible."}
                </p>
              </div>

              {/* Features */}
              {selectedProperty.features && selectedProperty.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Caractéristiques</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProperty.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DPE/GES */}
              <div className="flex space-x-4 mb-8">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  <span className={`px-3 py-1 rounded text-white font-bold ${getDpeColor(selectedProperty.dpe)}`}>
                    DPE {selectedProperty.dpe}
                  </span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  <span className={`px-3 py-1 rounded text-white font-bold ${getDpeColor(selectedProperty.ges)}`}>
                    GES {selectedProperty.ges}
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Contactez-nous</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-orange-500 mr-3" />
                    <span className="text-gray-700">06.83.93.41.67 ou 06.22.73.31.35</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-orange-500 mr-3" />
                    <span className="text-gray-700">ludwig.vynck@expfrance.fr ou frederic.autef@expfrance.fr</span>
                  </div>
                </div>

                {/* Zoomed Image Modal */}
                  {showImageZoom && zoomedImage && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300"
                  onClick={() => setShowImageZoom(false)}
                >
                <div className="relative max-w-full max-h-full p-4">
                  <img
                    src={zoomedImage}
                     alt="Zoomed"
                      className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl transform scale-100 transition-transform duration-300"
                />
                  <button
                    onClick={() => setShowImageZoom(false)}
                    className="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-2 shadow hover:bg-gray-200"
                >
                   ✕
                  </button>
                </div>
              </div>
              )}

                <div className="space-y-3">
                  <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    Demander une visite
                  </button>
                  <button className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                    Obtenir un financement
                  </button>
                </div>
              </div>

              {/* Admin Info Card */}
              {adminInfo && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Votre conseiller</h3>
                  <div className="flex items-center space-x-4">
                    <img
                      src={adminInfo.photo}
                      alt={adminInfo.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{adminInfo.name}</div>
                      <div className="text-sm text-gray-600">{adminInfo.email}</div>
                      <div className="text-sm text-gray-600">{adminInfo.phone}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Admin Mode Controls */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4 text-center">Mode Administrateur</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nom d'utilisateur (Ludwig ou Frédéric)"
                />
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mot de passe"
                  onKeyPress={(e) => e.key === 'Enter' && handleLoginSubmit()}
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleLoginSubmit}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Valider
                </button>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setLoginForm({ username: '', password: '' });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Admin Page
  if (currentPage === 'admin' && isAdminMode) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        {/* Admin Badge with current admin info */}
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
            <div className="animate-pulse text-center">MODE ADMIN</div>
            {currentAdmin && (
              <div className="flex items-center mt-2 pt-2 border-t border-red-400">
                <img
                  src={currentAdmin.photo}
                  alt={currentAdmin.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm">{currentAdmin.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
            Ajouter un Nouveau Bien
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du bien
              </label>
              <input
                type="text"
                value={newProperty.title || ''}
                onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Villa de prestige"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de bien
              </label>
              <select
                value={newProperty.type || 'maison'}
                onChange={(e) => setNewProperty({ ...newProperty, type: e.target.value as 'maison' | 'appartement' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="maison">Maison</option>
                <option value="appartement">Appartement</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>
              <input
                type="text"
                value={newProperty.location || ''}
                onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Limoges, Haute-Vienne"
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo du bien
              </label>

              {!useCustomImage ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple //✅ permet plusieurs fichiers
                    onChange={handleMultipleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <span className="text-sm text-gray-600">
                      Cliquez pour uploader une photo
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      PNG, JPG jusqu'à 10MB
                    </span>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                     onClick={() => removeCustomImage('image.jpg')}
                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
>
                      <X className="h-4 w-4" />
                  </button>
                  <div className="mt-2 text-sm text-green-600 font-medium">
                    ✓ Photo ajoutée avec succès
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newProperty.description || ''}
                onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Description détaillée du bien..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix (€)
                </label>
                <input
                  type="number"
                  value={newProperty.price || ''}
                  onChange={(e) => setNewProperty({ ...newProperty, price: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="450000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surface (m²)
                </label>
                <input
                  type="number"
                  value={newProperty.surface || ''}
                  onChange={(e) => setNewProperty({ ...newProperty, surface: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="250"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chambres
                </label>
                <input
                  type="number"
                  value={newProperty.bedrooms || ''}
                  onChange={(e) => setNewProperty({ ...newProperty, bedrooms: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salles de bain
                </label>
                <input
                  type="number"
                  value={newProperty.bathrooms || ''}
                  onChange={(e) => setNewProperty({ ...newProperty, bathrooms: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DPE
                </label>
                <select
                  value={newProperty.dpe || 'A'}
                  onChange={(e) => setNewProperty({ ...newProperty, dpe: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GES
                </label>
                <select
                  value={newProperty.ges || 'A'}
                  onChange={(e) => setNewProperty({ ...newProperty, ges: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleAddProperty}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Enregistrer le Bien
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Properties Page
  if (currentPage === 'properties') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
            >
              ← Retour à l'accueil
            </button>
            <h1 className="text-4xl font-bold text-blue-600 text-center">
              Nos Biens Immobiliers
            </h1>
            <p className="text-xl text-gray-600 text-center mt-4">
              Découvrez notre sélection de propriétés à la vente dans l'Allier, la Creuse, la Corrèze et la Haute-Vienne
            </p>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handlePropertyClick(property)}
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold">
                    {property.price.toLocaleString()} €
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.surface} m²</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        <span className={`px-2 py-1 rounded text-white text-xs font-bold ${getDpeColor(property.dpe)}`}>
                          DPE {property.dpe}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-1" />
                        <span className={`px-2 py-1 rounded text-white text-xs font-bold ${getDpeColor(property.ges)}`}>
                          GES {property.ges}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Mode Controls */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4 text-center">Mode Administrateur</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nom d'utilisateur (Ludwig ou Frédéric)"
                />
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mot de passe"
                  onKeyPress={(e) => e.key === 'Enter' && handleLoginSubmit()}
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleLoginSubmit}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Valider
                </button>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setLoginForm({ username: '', password: '' });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Home Page
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Mode Administrateur</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom d'utilisateur (Ludwig ou Frédéric)"
                autoFocus
              />
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mot de passe"
                onKeyPress={(e) => e.key === 'Enter' && handleLoginSubmit()}
              />
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleLoginSubmit}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Valider
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setLoginForm({ username: '', password: '' });
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Badge */}
      {isAdminMode && (
        <div className="fixed top-4 right-4 z-50">
          <div className="animate-pulse bg-red-500 text-white px-4 py-2 rounded-full font-bold">
            MODE ADMIN
          </div>
        </div>
      )}

      {/* Image Carousel Background */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-4 text-6xl font-bold md:text-7xl lg:text-8xl">
            <span className="text-blue-400 font-serif italic">Ludwig&Frédéric</span>{' '}
            <span className="text-white">Immobilier</span>
          </h1>

          <h2 className="mb-2 text-2xl font-semibold md:text-3xl lg:text-4xl">
            Propriétés de Qualité
          </h2>

          <p className="mb-12 text-xl md:text-2xl lg:text-3xl font-light">
            En Nouvelle-Aquitaine et Auvergne
          </p>

          <button
            onClick={() => setCurrentPage('properties')}
            className="rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700 hover:scale-105 md:px-12 md:py-5 md:text-xl"
          >
            Découvrir Nos Biens
          </button>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentImage
                ? 'bg-blue-500 scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Social Icons */}
      <div className="absolute bottom-6 right-6 z-20 flex space-x-4">
        <button className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110">
          <Facebook className="h-5 w-5" />
        </button>
        <button className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110">
          <User className="h-5 w-5" />
        </button>
        <button className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110">
          <Phone className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
