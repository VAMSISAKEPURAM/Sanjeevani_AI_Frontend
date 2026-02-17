export type Language = 'en' | 'hi' | 'te';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      analyze: 'Analyze Crop',
      about: 'About',
      getStarted: 'Get Started',
    },
    hero: {
      badge: 'AI-Powered Agriculture',
      title: 'Protect Your Crops with Intelligent Disease Detection',
      description:
        'Upload a photo of your crop leaf and get instant disease identification, treatment recommendations, and weather-based advisory.',
      cta: 'Detect Crop disease',
      learnMore: 'Learn More',
      features: {
        detection: {
          title: 'Disease Detection',
          desc: '98% accuracy in identifying crop diseases using advanced CNN models.',
        },
        solutions: {
          title: 'Smart Solutions',
          desc: 'Get organic and chemical pesticide recommendations tailored to your crop.',
        },
        weather: {
          title: 'Weather Advisory',
          desc: 'Know the best time to spray pesticides based on real-time weather data.',
        },
      },
      supportedCrops: {
        title: 'Supported Crops',
        list: [
          'Paddy',
          'Maize',
          'Chilli',
          'Ground Nut',
          'Tomato',
          'Potato',
          'Sugarcane',
        ],
      },
    },
    features: {
      title: 'Everything you need for healthy crops',
      subtitle:
        'We combine cutting-edge technology with agricultural expertise to provide a complete solution for farmers.',
      instantAnalysis: {
        title: 'Instant Analysis',
        desc: 'Get results in seconds. Our optimized model processes images quickly even on slower connections.',
      },
      database: {
        title: 'Comprehensive Database',
        desc: 'Support for Rice, Tomato, Potato, Chilli and other crops with a growing database of diseases.',
      },
      mobile: {
        title: 'Mobile Friendly',
        desc: 'Designed for the field. Access the full power of Sanjeevani AI from your smartphone.',
      },
      support: {
        title: 'Expert Support',
        desc: 'Connect with agricultural experts for personalized advice on complex crop issues.',
      },
    },
    footer: {
      rights: 'Built for farmers with ❤️.',
      tagline: 'Empowering Agriculture',
    },
    about: {
      title: 'About Sanjeevani AI',
      subtitle:
        'Empowering farmers with artificial intelligence for a healthier crop future.',
      description:
        'Sanjeevani AI is a web-based intelligent crop health analysis system designed to help farmers identify crop diseases instantly. By leveraging advanced Deep Learning (CNN) models, we provide accurate disease detection and actionable advice.',
      mission: {
        title: 'Our Mission',
        desc: 'To reduce crop loss due to diseases and minimize the misuse of pesticides by providing timely and accurate recommendations.',
      },
      features: {
        title: 'Key Features',
        list: [
          'Instant Disease Detection: Upload a photo and get results in seconds.',
          'Smart Pesticide Recommendations: Get suggestions for both organic and chemical treatments.',
          'Weather Integration: Know the best time to spray based on live weather conditions.',
          'User-Friendly Interface: Designed for ease of use by farmers.',
        ],
      },
      crops: {
        title: 'Supported Crops',
        description:
          'Supports varied crops including Rice, Tomato, Potato, Chilli, and many others.',
      },
      team: {
        title: 'The Team',
        desc: 'Developed by Vamsi and team, MCA Graduates and AI enthusiasts from Sri Venkateswara University, Tirupati.',
      },
    },
    analyze: {
      title: 'Crop Disease Analysis',
      subtitle: 'Upload a photo to identify diseases and get treatment advice.',
      upload: {
        dragDrop: 'Drag & drop an image here, or click to select',
        supports: 'JPG, PNG (max 5MB)',
        analyzing: 'Analyzing...',
        analyzeBtn: 'Analyze Crop',
        analyzeAnother: 'Analyze Another Image',
        browseBtn: 'Browse Files',
        or: 'OR',
        cameraBtn: 'Take Photo',
      },
      result: {
        confidence: 'Confidence',
        symptoms: 'Symptoms',
        chemical: 'Chemical Treatment',
        organic: 'Organic Solution',
        weather: 'Weather Advisory',
      },
    },
    weatherWidget: {
      title: 'Live Weather',
      celsius: 'Celsius',
      humidity: 'Humidity',
      wind: 'Wind',
      rain: 'Rain',
      demoData: 'Using demo data',
    },
    cookieConsent: {
      message:
        'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.',
      accept: 'Accept',
      decline: 'Decline',
    },
    marketPrices: {
      title: 'Live Market Prices',
      price: 'Price',
      trend: 'Trend',
      market: 'Market',
      quintal: '/100kg',
      disclaimer:
        'Note: The prices shown above are simulated for demonstration purposes.',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      analyze: 'फसल विश्लेषण',
      about: 'हमारे बारे में',
      getStarted: 'शुरू करें',
    },
    hero: {
      badge: 'एआई-संचालित कृषि',
      title: 'बुद्धिमान रोग पहचान के साथ अपनी फसलों की रक्षा करें',
      description:
        'अपनी फसल की पत्ती की एक तस्वीर अपलोड करें और तुरंत रोग की पहचान, उपचार की सिफारिशें और मौसम आधारित सलाह प्राप्त करें।',
      cta: 'अपनी फसल का विश्लेषण करें',
      learnMore: 'और जानें',
      features: {
        detection: {
          title: 'रोग पहचान',
          desc: 'उन्नत सीएनएन मॉडल का उपयोग करके फसल रोगों की पहचान करने में 98% सटीकता।',
        },
        solutions: {
          title: 'स्मार्ट समाधान',
          desc: 'अपनी फसल के लिए जैविक और रासायनिक कीटनाशक सिफारिशें प्राप्त करें।',
        },
        weather: {
          title: 'मौसम सलाह',
          desc: 'वास्तविक समय के मौसम डेटा के आधार पर कीटनाशकों का छिड़काव करने का सबसे अच्छा समय जानें।',
        },
      },
      supportedCrops: {
        title: 'समर्थित फसलें',
        list: ['धान', 'मक्का', 'मिर्च', 'मूंगफली', 'टमाटर', 'आलू', 'गन्ना'],
      },
    },
    features: {
      title: 'स्वस्थ फसलों के लिए आपको जो कुछ भी चाहिए',
      subtitle:
        'हम किसानों को एक संपूर्ण समाधान प्रदान करने के लिए कृषि विशेषज्ञता के साथ अत्याधुनिक तकनीक को जोड़ते हैं।',
      instantAnalysis: {
        title: 'त्वरित विश्लेषण',
        desc: 'सेकंड में परिणाम प्राप्त करें। हमारा अनुकूलित मॉडल धीमी गति वाले कनेक्शन पर भी छवियों को जल्दी से संसाधित करता है।',
      },
      database: {
        title: 'व्यापक डेटाबेस',
        desc: 'चावल, टमाटर, आलू, मिर्च और अन्य फसलों के लिए समर्थन, रोगों के बढ़ते डेटाबेस के साथ।',
      },
      mobile: {
        title: 'मोबाइल के अनुकूल',
        desc: 'खेत के लिए डिज़ाइन किया गया। अपने स्मार्टफोन से संजीवनी एआई की पूरी शक्ति का उपयोग करें।',
      },
      support: {
        title: 'विशेषज्ञ सहायता',
        desc: 'जटिल फसल मुद्दों पर व्यक्तिगत सलाह के लिए कृषि विशेषज्ञों से जुड़ें।',
      },
    },
    footer: {
      rights: 'किसानों के लिए ❤️ के साथ बनाया गया।',
      tagline: 'कृषि को सशक्त बनाना',
    },
    about: {
      title: 'संजीवनी एआई के बारे में',
      subtitle:
        'स्वस्थ फसल भविष्य के लिए कृत्रिम बुद्धिमत्ता के साथ किसानों को सशक्त बनाना।',
      description:
        'संजीवनी एआई एक वेब-आधारित बुद्धिमान फसल स्वास्थ्य विश्लेषण प्रणाली है जिसे किसानों को तुरंत फसल रोगों की पहचान करने में मदद करने के लिए डिज़ाइन किया गया है। उन्नत डीप लर्निंग (सीएनएन) मॉडल का लाभ उठाकर, हम सटीक रोग पहचान और कार्रवाई योग्य सलाह प्रदान करते हैं।',
      mission: {
        title: 'हमारा मिशन',
        desc: 'समय पर और सटीक सिफारिशें प्रदान करके बीमारियों के कारण फसल के नुकसान को कम करना और कीटनाशकों के दुरुपयोग को कम करना।',
      },
      features: {
        title: 'प्रमुख विशेषताएं',
        list: [
          'त्वरित रोग पहचान: एक फोटो अपलोड करें और सेकंड में परिणाम प्राप्त करें।',
          'स्मार्ट कीटनाशक सिफारिशें: जैविक और रासायनिक दोनों उपचारों के लिए सुझाव प्राप्त करें।',
          'मौसम एकीकरण: लाइव मौसम की स्थिति के आधार पर स्प्रे करने का सबसे अच्छा समय जानें।',
          'उपयोगकर्ता के अनुकूल इंटरफ़ेस: किसानों द्वारा उपयोग में आसानी के लिए डिज़ाइन किया गया।',
        ],
      },
      crops: {
        title: 'समर्थित फसलें',
        description:
          'चावल, टमाटर, आलू, मिर्च और अन्य कई फसलों का समर्थन करता है।',
      },
      team: {
        title: 'टीम',
        desc: 'वमसी और टीम द्वारा विकसित, श्री वेंकटेश्वर विश्वविद्यालय, तिरुपति से एमसीए स्नातक और एआई उत्साही।',
      },
    },
    analyze: {
      title: 'फसल रोग विश्लेषण',
      subtitle:
        'रोगों की पहचान करने और उपचार सलाह प्राप्त करने के लिए एक फोटो अपलोड करें।',
      upload: {
        dragDrop: 'यहाँ एक छवि खींचें और छोड़ें, या चुनने के लिए क्लिक करें',
        supports: 'JPG, PNG (अधिकतम 5MB) का समर्थन करता है',
        analyzing: 'विश्लेषण कर रहा है...',
        analyzeBtn: 'फसल का विश्लेषण करें',
        analyzeAnother: 'दूसरी छवि का विश्लेषण करें',
        browseBtn: 'फाइलें चुनें',
        or: 'या',
        cameraBtn: 'तस्वीर लें',
      },
      result: {
        confidence: 'आत्मविश्वास',
        symptoms: 'लक्षण',
        chemical: 'रासायनिक उपचार',
        organic: 'जैविक समाधान',
        weather: 'मौसम सलाह',
      },
    },
    weatherWidget: {
      title: 'लाइव मौसम',
      celsius: 'सेल्सियस',
      humidity: 'नमी',
      wind: 'हवा',
      rain: 'बारिश',
      demoData: 'डेमो डेटा का उपयोग',
    },
    cookieConsent: {
      message:
        'हम आपके अनुभव को बढ़ाने के लिए कुकीज़ का उपयोग करते हैं। इस साइट पर जाकर आप कुकीज़ के हमारे उपयोग के लिए सहमत हैं।',
      accept: 'स्वीकार करें',
      decline: 'अस्वीकार करें',
    },
    marketPrices: {
      title: 'लाइव बाजार भाव',
      price: 'कीमत',
      trend: 'रुझान',
      market: 'बाजार',
      quintal: '/100kg',
      disclaimer:
        'नोट: ऊपर दिखाए गए मूल्य केवल प्रदर्शन उद्देश्यों के लिए अनुकरण किए गए हैं।',
    },
  },
  te: {
    nav: {
      home: 'హోమ్',
      analyze: 'పంట విశ్లేషణ',
      about: 'మా గురించి',
      getStarted: 'ప్రారంభించండి',
    },
    hero: {
      badge: 'AI-ఆధారిత వ్యవసాయం',
      title: 'తెలివైన వ్యాధి గుర్తింపుతో మీ పంటలను రక్షించుకోండి',
      description:
        'మీ పంట ఆకు ఫోటోను అప్‌లోడ్ చేయండి మరియు తక్షణ వ్యాధి గుర్తింపు, చికిత్స సిఫార్సులు మరియు వాతావరణ ఆధారిత సలహాలను పొందండి.',
      cta: 'మీ పంటను విశ్లేషించండి',
      learnMore: 'మరింత తెలుసుకోండి',
      features: {
        detection: {
          title: 'వ్యాధి గుర్తింపు',
          desc: 'అధునాతన CNN మోడళ్లను ఉపయోగించి పంట వ్యాధులను గుర్తించడంలో 98% ఖచ్చితత్వం.',
        },
        solutions: {
          title: 'స్మార్ట్ పరిష్కారాలు',
          desc: 'మీ పంటకు తగిన సేంద్రీయ మరియు రసాయన పురుగుమందుల సిఫార్సులను పొందండి.',
        },
        weather: {
          title: 'వాతావరణ సలహా',
          desc: 'నిజ-సమయ వాతావరణ డేటా ఆధారంగా పురుగుమందులను పిచికారీ చేయడానికి ఉత్తమ సమయాన్ని తెలుసుకోండి.',
        },
      },
      supportedCrops: {
        title: 'మద్దతు ఉన్న పంటలు',
        list: [
          'వరి',
          'మొక్కజొన్న',
          'మిరప',
          'వేరుశెనగ',
          'టమోటా',
          'బంగాళాదుంప',
          'చెరకు',
        ],
      },
    },
    features: {
      title: 'ఆరోగ్యకరమైన పంటల కోసం మీకు కావలసినవన్నీ',
      subtitle:
        'రైతులకు పూర్తి పరిష్కారాన్ని అందించడానికి మేము వ్యవసాయ నైపుణ్యంతో అత్యాధునిక సాంకేతికతను మిళితం చేస్తాము.',
      instantAnalysis: {
        title: 'తక్షణ విశ్లేషణ',
        desc: 'సెకన్లలో ఫలితాలను పొందండి. మా ఆప్టిమైజ్ చేసిన మోడల్ నెమ్మదిగా ఉండే ఇంటర్నెట్‌లో కూడా చిత్రాలను త్వరగా ప్రాసెస్ చేస్తుంది.',
      },
      database: {
        title: 'సమగ్ర డేటాబేస్',
        desc: 'వరి, టమోటా, బంగాళాదుంప, మిరప మరియు ఇతర పంటలకు మద్దతు, పెరుగుతున్న వ్యాధుల డేటాబేస్‌తో.',
      },
      mobile: {
        title: 'మొబైల్ ఫ్రెండ్లీ',
        desc: 'పొలం కోసం రూపొందించబడింది. మీ స్మార్ట్‌ఫోన్ నుండి సంజీవని AI యొక్క పూర్తి శక్తిని యాక్సెస్ చేయండి.',
      },
      support: {
        title: 'నిపుణుల మద్దతు',
        desc: 'సంక్లిష్టమైన పంట సమస్యలపై వ్యక్తిగత సలహాల కోసం వ్యవసాయ నిపుణులతో కనెక్ట్ అవ్వండి.',
      },
    },
    footer: {
      rights: 'రైతుల కోసం ❤️ తో రూపొందించబడింది.',
      tagline: 'వ్యవసాయాన్ని శక్తివంతం చేయడం',
    },
    about: {
      title: 'సంజీవని AI గురించి',
      subtitle:
        'ఆరోగ్యకరమైన పంట భవిష్యత్తు కోసం కృత్రిమ మేధస్సుతో రైతులను శక్తివంతం చేయడం.',
      description:
        'సంజీవని AI అనేది వెబ్-ఆధారిత తెలివైన పంట ఆరోగ్య విశ్లేషణ వ్యవస్థ, ఇది రైతులు పంట వ్యాధులను తక్షణమే గుర్తించడంలో సహాయపడటానికి రూపొందించబడింది. అధునాతన డీప్ లెర్నింగ్ (CNN) మోడళ్లను ఉపయోగించుకోవడం ద్వారా, మేము ఖచ్చితమైన వ్యాధి గుర్తింపు మరియు ఆచరణాత్మక సలహాలను అందిస్తాము.',
      mission: {
        title: 'మా లక్ష్యం',
        desc: 'సమయానుకూల మరియు ఖచ్చితమైన సిఫార్సులను అందించడం ద్వారా వ్యాధుల వల్ల పంట నష్టాన్ని తగ్గించడం మరియు పురుగుమందుల దుర్వినియోగాన్ని తగ్గించడం.',
      },
      features: {
        title: 'ముఖ్య లక్షణాలు',
        list: [
          'తక్షణ వ్యాధి గుర్తింపు: ఫోటోను అప్‌లోడ్ చేయండి మరియు సెకన్లలో ఫలితాలను పొందండి.',
          'స్మార్ట్ పురుగుమందుల సిఫార్సులు: సేంద్రీయ మరియు రసాయన చికిత్సల కోసం సూచనలను పొందండి.',
          'వాతావరణ అనుసంధానం: ప్రత్యక్ష వాతావరణ పరిస్థితుల ఆధారంగా పిచికారీ చేయడానికి ఉత్తమ సమయాన్ని తెలుసుకోండి.',
          'యూజర్ ఫ్రెండ్లీ ఇంటర్‌ఫేస్: రైతులు సులభంగా ఉపయోగించేలా రూపొందించబడింది.',
        ],
      },
      crops: {
        title: 'మద్దతు ఉన్న పంటలు',
        description:
          'వరి, టమోటా, బంగాళాదుంప, మిరప మరియు అనేక ఇతర పంటలకు మద్దతు ఇస్తుంది.',
      },
      team: {
        title: 'బృందం',
        desc: 'వంశీ మరియు బృందం అభివృద్ధి చేశారు, శ్రీ వెంకటేశ్వర విశ్వవిద్యాలయం, తిరుపతి నుండి MCA గ్రాడ్యుయేట్లు మరియు AI ఔత్సాహికులు.',
      },
    },
    analyze: {
      title: 'పంట వ్యాధి విశ్లేషణ',
      subtitle:
        'వ్యాధులను గుర్తించడానికి మరియు చికిత్స సలహాలను పొందడానికి ఫోటోను అప్‌లోడ్ చేయండి.',
      upload: {
        dragDrop:
          'ఇక్కడ చిత్రాన్ని లాగండి మరియు వదలండి, లేదా ఎంచుకోవడానికి క్లిక్ చేయండి',
        supports: 'JPG, PNG (గరిష్టంగా 5MB) మద్దతు ఇస్తుంది',
        analyzing: 'విశ్లేషిస్తోంది...',
        analyzeBtn: 'పంటను విశ్లేషించండి',
        analyzeAnother: 'మరొక చిత్రాన్ని విశ్లేషించండి',
        browseBtn: 'ఫైల్స్ ఎంచుకోండి',
        or: 'లేదా',
        cameraBtn: 'ఫోటో తీయండి',
      },
      result: {
        confidence: 'నమ్మకం',
        symptoms: 'లక్షణాలు',
        chemical: 'రసాయన చికిత్స',
        organic: 'సేంద్రీయ పరిష్కారం',
        weather: 'వాతావరణ సలహా',
      },
    },
    weatherWidget: {
      title: 'ప్రత్యక్ష వాతావరణం',
      celsius: 'సెల్సియస్',
      humidity: 'తేమ',
      wind: 'గాలి',
      rain: 'వర్షం',
      demoData: 'డెమో డేటాను ఉపయోగిస్తోంది',
    },
    cookieConsent: {
      message:
        'మీ అనుభవాన్ని మెరుగుపరచడానికి మేము కుకీలను ఉపయోగిస్తాము. ఈ సైట్‌ని సందర్శించడం కొనసాగించడం ద్వారా మీరు మా కుకీల వినియోగానికి అంగీకరిస్తున్నారు.',
      accept: 'అంగీకరించండి',
      decline: 'తిరస్కరించండి',
    },
    marketPrices: {
      title: 'ప్రత్యక్ష మార్కెట్ ధరలు',
      price: 'ధర',
      trend: 'ధోరణి',
      market: 'మార్కెట్',
      quintal: '/100kg',
      disclaimer:
        'గమనిక: పైన చూపిన ధరలు ప్రదర్శన ప్రయోజనాల కోసం మాత్రమే అనుకరించబడ్డాయి.',
    },
  },
};
