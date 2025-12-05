import React, { useState, useEffect } from 'react';
import { Search, Chrome, Mail, Github, Youtube, Twitter, Linkedin, Instagram, Facebook, Music, ShoppingCart, Calendar, FileText, Cloud, Sparkles, Settings, Plus, Trash2, Edit2, X, Save } from 'lucide-react';

const BrowserHome = () => {
  const defaultApps = [
    { name: 'GitHub', icon: 'Github', url: 'https://github.com', gradient: 'from-gray-700 via-gray-800 to-slate-900', shadow: 'shadow-gray-700/50' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com', gradient: 'from-red-500 via-rose-600 to-pink-600', shadow: 'shadow-red-600/50' },
    { name: 'Spotify', icon: 'Music', url: 'https://spotify.com', gradient: 'from-green-400 via-emerald-500 to-teal-600', shadow: 'shadow-green-500/50' },
    { name: 'Notion', icon: 'FileText', url: 'https://notion.so', gradient: 'from-slate-600 via-gray-700 to-zinc-800', shadow: 'shadow-slate-700/50' },
    { name: 'Amazon', icon: 'ShoppingCart', url: 'https://amazon.fr', gradient: 'from-orange-400 via-amber-500 to-yellow-600', shadow: 'shadow-orange-500/50' },
    { name: 'Apple', icon: 'Cloud', url: 'https://apple.com', gradient: 'from-slate-400 via-gray-500 to-zinc-600', shadow: 'shadow-slate-500/50' },
    { name: 'ChatGPT', icon: 'Sparkles', url: 'https://chat.openai.com', gradient: 'from-teal-400 via-cyan-500 to-blue-600', shadow: 'shadow-cyan-500/50' },
  ];

  const iconMap = { Mail, Github, Youtube, Twitter, Linkedin, Instagram, Facebook, Music, ShoppingCart, Calendar, FileText, Cloud, Sparkles, Chrome };

  const [apps, setApps] = useState(defaultApps);
  const [currentApp, setCurrentApp] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [appSearchQuery, setAppSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [newApp, setNewApp] = useState({ name: '', icon: 'Chrome', url: '', gradient: 'from-indigo-500 via-purple-500 to-pink-500', shadow: 'shadow-purple-500/50' });

  const welcomeMessages = [
    "Ravi de vous revoir !",
    "Prêt à explorer ?",
    "Belle journée pour commencer !",
    "Quelle sera votre prochaine découverte ?",
    "L'inspiration commence ici",
    "Bienvenue dans votre espace",
    "Que l'aventure commence !",
    "Votre créativité n'attend que vous"
  ];

  const gradientOptions = [
    { name: 'Rouge', gradient: 'from-red-400 via-pink-500 to-rose-600', shadow: 'shadow-red-500/50' },
    { name: 'Bleu', gradient: 'from-sky-400 via-blue-500 to-cyan-600', shadow: 'shadow-blue-500/50' },
    { name: 'Vert', gradient: 'from-green-400 via-emerald-500 to-teal-600', shadow: 'shadow-green-500/50' },
    { name: 'Violet', gradient: 'from-indigo-500 via-purple-500 to-pink-500', shadow: 'shadow-purple-500/50' },
    { name: 'Orange', gradient: 'from-orange-400 via-amber-500 to-yellow-600', shadow: 'shadow-orange-500/50' },
    { name: 'Rose', gradient: 'from-purple-500 via-pink-500 to-orange-500', shadow: 'shadow-pink-500/50' },
    { name: 'Gris', gradient: 'from-gray-700 via-gray-800 to-slate-900', shadow: 'shadow-gray-700/50' },
  ];

  useEffect(() => {
    const stored = localStorage.getItem('browserHomeApps');
    if (stored) {
      setApps(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    setWelcomeMessage(welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentApp((prev) => (prev + 1) % apps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [apps.length]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const saveApps = (updatedApps) => {
    setApps(updatedApps);
    localStorage.setItem('browserHomeApps', JSON.stringify(updatedApps));
  };

  const handleAddApp = () => {
    if (newApp.name && newApp.url) {
      saveApps([...apps, { ...newApp }]);
      setNewApp({ name: '', icon: 'Chrome', url: '', gradient: 'from-indigo-500 via-purple-500 to-pink-500', shadow: 'shadow-purple-500/50' });
    }
  };

  const handleDeleteApp = (index) => {
    saveApps(apps.filter((_, i) => i !== index));
    if (currentApp >= apps.length - 1) setCurrentApp(0);
  };

  const handleEditApp = (index) => {
    setEditingApp({ ...apps[index], index });
  };

  const handleSaveEdit = () => {
    if (editingApp) {
      const updated = [...apps];
      updated[editingApp.index] = { name: editingApp.name, icon: editingApp.icon, url: editingApp.url, gradient: editingApp.gradient, shadow: editingApp.shadow };
      saveApps(updated);
      setEditingApp(null);
    }
  };

  const handleWebSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      window.open(`https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`, '_blank');
      setSearchQuery('');
    }
  };

  const filteredApps = appSearchQuery 
    ? apps.filter(app => app.name.toLowerCase().includes(appSearchQuery.toLowerCase()))
    : [];

  const currentAppData = apps[currentApp];
  const Icon = iconMap[currentAppData?.icon] || Chrome;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-indigo-100 to-blue-100 overflow-hidden">
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Bouton paramètres */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-lg hover:bg-white/70 hover:scale-110 transition-all duration-300"
      >
        <Settings className="w-5 h-5 text-indigo-600" />
      </button>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8 space-y-3">
          <div className="flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top duration-700">
            <Sparkles className="w-6 h-6 text-violet-500 animate-pulse" />
            <p className="text-lg text-indigo-600 font-medium">{welcomeMessage}</p>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </h1>
          <p className="text-base text-indigo-500 font-medium capitalize">
            {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Recherches */}
        <div className="grid grid-cols-2 gap-3 mb-12 max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleWebSearch}
              placeholder="DuckDuckGo..."
              className="w-full pl-11 pr-4 py-2.5 text-sm rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 focus:bg-white/60 transition-all text-gray-800 placeholder-gray-500"
            />
          </div>
          <div className="relative">
            <Chrome className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-violet-400" />
            <input
              type="text"
              value={appSearchQuery}
              onChange={(e) => setAppSearchQuery(e.target.value)}
              placeholder="Applications..."
              className="w-full pl-11 pr-4 py-2.5 text-sm rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 focus:bg-white/60 transition-all text-gray-800 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Résultats recherche */}
        {appSearchQuery && (
          <div className="rounded-3xl bg-white/40 backdrop-blur-lg border border-white/60 shadow-xl p-5 mb-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-6 gap-3">
              {filteredApps.map((app, index) => {
                const AppIcon = iconMap[app.icon] || Chrome;
                return (
                  <a key={index} href={app.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white/50 hover:bg-white/70 hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <div className={`bg-gradient-to-br ${app.gradient} p-2.5 rounded-xl ${app.shadow} shadow-lg`}>
                      <AppIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{app.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Carrousel */}
        {currentAppData && (
          <div className="flex items-center justify-center mb-10">
            <a href={currentAppData.url} target="_blank" rel="noopener noreferrer" className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${currentAppData.gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse`}></div>
              <div className="relative w-80 h-80 rounded-full bg-white/50 backdrop-blur-2xl border-2 border-white/80 shadow-2xl flex flex-col items-center justify-center gap-6 group-hover:scale-105 group-hover:border-white transition-all duration-500">
                <div className={`relative bg-gradient-to-br ${currentAppData.gradient} p-10 rounded-full ${currentAppData.shadow} shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-20 h-20 text-white" />
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 group-hover:scale-105 transition-transform duration-300">{currentAppData.name}</h2>
              </div>
              <div className="absolute inset-0 rounded-full border border-violet-400/20 animate-spin" style={{animationDuration: '15s'}}></div>
              <div className="absolute inset-0 rounded-full border border-indigo-400/20 animate-spin" style={{animationDuration: '20s', animationDirection: 'reverse'}}></div>
            </a>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center gap-2 mb-10">
          {apps.map((app, index) => (
            <button key={index} onClick={() => setCurrentApp(index)} className={`transition-all duration-500 rounded-full ${index === currentApp ? `h-2.5 w-10 bg-gradient-to-r ${app.gradient} shadow-lg` : 'h-2.5 w-2.5 bg-indigo-300/60 hover:bg-indigo-400 hover:w-6'}`} />
          ))}
        </div>

        {/* Grille */}
        <div className="rounded-3xl bg-white/35 backdrop-blur-xl border border-white/60 shadow-xl p-6">
          <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
            {apps.map((app, index) => {
              const AppIcon = iconMap[app.icon] || Chrome;
              return (
                <button key={index} onClick={() => setCurrentApp(index)} className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/40 hover:bg-white/70 hover:shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                  <div className={`bg-gradient-to-br ${app.gradient} p-2.5 rounded-xl ${app.shadow} shadow-lg group-hover:scale-110 transition-transform`}>
                    <AppIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal Paramètres */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-white">
            <div className="sticky top-0 bg-white/95 backdrop-blur-xl p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Gérer les applications</h2>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Liste des apps */}
              <div className="space-y-3">
                {apps.map((app, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-gray-200">
                    <div className={`bg-gradient-to-br ${app.gradient} p-3 rounded-xl shadow-lg flex-shrink-0`}>
                      {React.createElement(iconMap[app.icon] || Chrome, { className: "w-6 h-6 text-white" })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 truncate">{app.name}</p>
                      <p className="text-sm text-gray-500 truncate">{app.url}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditApp(index)} className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button onClick={() => handleDeleteApp(index)} className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ajouter une app */}
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5" /> Ajouter une application
                </h3>
                <div className="space-y-3">
                  <input type="text" placeholder="Nom" value={newApp.name} onChange={(e) => setNewApp({...newApp, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none" />
                  <input type="url" placeholder="URL (https://...)" value={newApp.url} onChange={(e) => setNewApp({...newApp, url: e.target.value})} className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none" />
                  <select value={newApp.icon} onChange={(e) => setNewApp({...newApp, icon: e.target.value})} className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none">
                    {Object.keys(iconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                  <select onChange={(e) => {const g = gradientOptions[e.target.value]; setNewApp({...newApp, gradient: g.gradient, shadow: g.shadow});}} className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none">
                    {gradientOptions.map((g, i) => <option key={i} value={i}>{g.name}</option>)}
                  </select>
                  <button onClick={handleAddApp} className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edition */}
      {editingApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-6 border-2 border-white">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Modifier l'application</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Nom" value={editingApp.name} onChange={(e) => setEditingApp({...editingApp, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none" />
              <input type="url" placeholder="URL" value={editingApp.url} onChange={(e) => setEditingApp({...editingApp, url: e.target.value})} className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none" />
              <select value={editingApp.icon} onChange={(e) => setEditingApp({...editingApp, icon: e.target.value})} className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none">
                {Object.keys(iconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
              <select onChange={(e) => {const g = gradientOptions[e.target.value]; setEditingApp({...editingApp, gradient: g.gradient, shadow: g.shadow});}} className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none">
                {gradientOptions.map((g, i) => <option key={i} value={i}>{g.name}</option>)}
              </select>
              <div className="flex gap-3">
                <button onClick={() => setEditingApp(null)} className="flex-1 py-2 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors">
                  Annuler
                </button>
                <button onClick={handleSaveEdit} className="flex-1 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                  <Save className="w-4 h-4 inline mr-2" /> Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowserHome;