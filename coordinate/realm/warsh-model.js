exports.Hizb = {
  name: 'Hizb',
  primaryKey: 'index',
  properties: {
    index: 'int',
    titleTranslations: 'translation_hizbName[]',
    quarters: 'Quarter[]'
  }
}

exports.LineFragment = {
  name: 'LineFragment',
  properties: {
    verse: 'Verse',
    moshaf: 'masahef',
    page: 'Page',
    x1: 'float',
    y1: 'float',
    x2: 'float',
    y2: 'float'
  }
}

exports.MarkerRectangle = {
  name: 'MarkerRectangle',
  properties: {
    verse: 'Verse',
    moshaf: 'masahef',
    page: 'Page',
    x1: 'float',
    y1: 'float',
    x2: 'float',
    y2: 'float'
  }
}

exports.Page = {
  name: 'Page',
  properties: {
    pageNumberInMoshaf: { type: 'int', indexed: true },
    moshaf: 'masahef',
    lessonsTranslations: 'translation_pageLessons[]',
    verses: 'Verse[]',
    quarter: 'Quarter',
    surahsHeaders: 'SurahHeader[]',
    suras: 'Surah[]'
  }
}

exports.Part = {
  name: 'Part',
  primaryKey: 'index',
  properties: {
    index: 'int',
    titleTranslations: 'translation_partName[]',
    hizbs: 'Hizb[]',
    quarters: 'Quarter[]'
  }
}

exports.Part_Suras = {
  name: 'Part_Suras',
  properties: {
    part: 'Part',
    surahs: 'Surah[]',
    rewaya: 'rewayat'
  }
}

exports.Quarter = {
  name: 'Quarter',
  primaryKey: 'index',
  properties: {
    index: 'int',
    titleTranslations: 'translation_quarterName[]'
  }
}

exports.Quarter_first_verse = {
  name: 'Quarter_first_verse',
  properties: {
    quarter: 'Quarter',
    firstVerse: 'Verse',
    rewaya: 'rewayat'
  }
}

exports.Surah = {
  name: 'Surah',
  primaryKey: 'index',
  properties: {
    index: 'int',
    searchText: { type: 'string', indexed: true },
    isMakkiyah: 'bool',
    titleUthmani: 'string',
    verses: 'Verse[]',
    headers: 'SurahHeader[]',
    topics: 'translation_suraTopic[]',
    titleTranslations: 'translation_surahNames[]'
  }
}

exports.SurahHeader = {
  name: 'SurahHeader',
  primaryKey: 'index',
  properties: {
    index: 'int',
    moshaf: 'masahef',
    surah: 'Surah',
    page: 'Page',
    x1: 'float',
    y1: 'float',
    x2: 'float',
    y2: 'float'
  }
}

exports.Translation = {
  name: 'Translation',
  properties: {
    lang: 'languages',
    translation: 'string'
  }
}

exports.Verse = {
  name: 'Verse',
  primaryKey: 'index',
  properties: {
    index: 'int',
    surah: 'Surah',
    rewaya: 'rewayat',
    numberInSurah: { type: 'int', indexed: true },
    varsesInRewayaHafs: 'Verse[]',
    masahef_pages: 'Page[]',
    quarter: 'Quarter',
    cleanText: 'string',
    searchText: { type: 'string', indexed: true },
    textUthmani: 'string',
    isFavorited: { type: 'bool', indexed: true },
    isBookMarked: { type: 'bool', indexed: true },
    notes: 'string',
    masahef_lineFragments: 'LineFragment[]',
    masahef_markers: 'MarkerRectangle[]'
  }
}

exports.__Class = {
  name: '__Class',
  primaryKey: 'name',
  properties: {
    name: 'string',
    permissions: '__Permission[]'
  }
}

exports.__Permission = {
  name: '__Permission',
  properties: {
    role: '__Role',
    canRead: 'bool',
    canUpdate: 'bool',
    canDelete: 'bool',
    canSetPermissions: 'bool',
    canQuery: 'bool',
    canCreate: 'bool',
    canModifySchema: 'bool'
  }
}

exports.__Realm = {
  name: '__Realm',
  primaryKey: 'id',
  properties: {
    id: 'int',
    permissions: '__Permission[]'
  }
}

exports.__Role = {
  name: '__Role',
  primaryKey: 'name',
  properties: {
    name: 'string',
    members: '__User[]'
  }
}

exports.__User = {
  name: '__User',
  primaryKey: 'id',
  properties: {
    id: 'string',
    role: '__Role'
  }
}

exports.audio_reciters = {
  name: 'audio_reciters',
  primaryKey: 'index',
  properties: {
    index: 'int',
    shortName: 'string',
    rewaya: 'rewayat',
    tracks: 'audio_tracks[]',
    translations: 'translation_reciterName[]'
  }
}

exports.audio_timing = {
  name: 'audio_timing',
  primaryKey: 'index',
  properties: {
    index: 'int',
    verse: 'Verse',
    track: 'audio_tracks',
    timeOfEnding: 'int'
  }
}

exports.audio_tracks = {
  name: 'audio_tracks',
  primaryKey: 'index',
  properties: {
    index: 'int',
    url: 'string',
    sura: 'Surah',
    reciter: 'audio_reciters',
    isDownloaded: 'bool',
    timings: 'audio_timing[]'
  }
}

exports.languages = {
  name: 'languages',
  properties: {
    iso: { type: 'string', indexed: true },
    langName: 'string',
    isRTL_direction: 'bool'
  }
}

exports.masahef = {
  name: 'masahef',
  primaryKey: 'index',
  properties: {
    index: 'int',
    shortName: 'string',
    isDownloaded: { type: 'bool', indexed: true },
    rewaya: 'rewayat',
    downloadingUrl: 'string',
    imageUrl: 'string',
    nameTranslations: 'translation_masahefNames[]'
  }
}

exports.pdfBooks = {
  name: 'pdfBooks',
  primaryKey: 'index',
  properties: {
    index: 'int',
    shortName: 'string',
    isDownloaded: { type: 'bool', indexed: true },
    downloadingUrl: 'string',
    language: 'languages',
    imageUrl: 'string',
    titleTranslations: 'translation_pdfBooksTitles[]'
  }
}

exports.rewayat = {
  name: 'rewayat',
  primaryKey: 'index',
  properties: {
    index: 'int',
    shortName: { type: 'string', indexed: true },
    translations: 'translation_rewayatNames[]'
  }
}

exports.test = {
  name: 'test',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    sds: 'bool',
    wxc: 'objectId[]',
    osq: 'Hizb'
  }
}

exports.textBooks = {
  name: 'textBooks',
  primaryKey: 'index',
  properties: {
    index: 'int',
    isDownloaded: { type: 'bool', indexed: true },
    downloadingUrl: 'string',
    type: 'int',
    language: 'languages',
    title: 'string',
    shortName: 'string',
    imageUrl: 'string',
    textContents: 'textBooksContents[]'
  }
}

exports.textBooksContents = {
  name: 'textBooksContents',
  properties: {
    textBook: 'textBooks',
    text: 'string',
    surah: 'Surah',
    verseInHafs: 'Verse'
  }
}

exports.translation_hizbName = {
  name: 'translation_hizbName',
  properties: {
    lang: 'languages',
    translation: 'string'
  }
}

exports.translation_masahefNames = {
  name: 'translation_masahefNames',
  properties: {
    lang: 'languages',
    translation: 'string'
  }
}

exports.translation_pageLessons = {
  name: 'translation_pageLessons',
  properties: {
    lang: 'languages',
    translation: 'string'
  }
}

exports.translation_partName = {
  name: 'translation_partName',
  properties: {
    lang: 'languages',
    translation: 'string'
  }
}

exports.translation_pdfBooksTitles = {
  name: 'translation_pdfBooksTitles',
  properties: {
    lang: 'languages',
    translation: 'string'
  }
}

exports.translation_quarterName = {
  name: 'translation_quarterName',
  properties: {
    lang: 'languages',
    translation: 'string'
  }
}

exports.translation_reciterName = {
  name: 'translation_reciterName',
  properties: {
    lang: 'languages',
    translation: 'string'
  }
}

exports.translation_rewayatNames = {
  name: 'translation_rewayatNames',
  properties: {
    lang: 'languages',
    translation: 'string'
  }
}

exports.translation_suraTopic = {
  name: 'translation_suraTopic',
  properties: {
    lang: 'languages',
    translation: 'string'
  }
}

exports.translation_surahNames = {
  name: 'translation_surahNames',
  properties: {
    lang: 'languages',
    translation: 'string'
  }
}

