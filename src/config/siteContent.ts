/**
 * 1ファイルですべての宿のコンテンツを管理するスキーマ。
 * 別の宿に展開するときはこのファイルだけ書き換えれば良い。
 *
 * 実データ: Sauna Private Villa AO / サウナヴィラ碧
 */

const IMG = {
    // Hero
    heroSauna: "https://i.imgur.com/5fv3XpV.png",
    heroExterior: "https://i.imgur.com/t0ktKAJ.png",
    heroSaunaWinter: "https://i.imgur.com/KWeVpXq.png",

    // Concept / Wellness
    concept: "https://i.imgur.com/VE4Ub2m.png",
    saunaInside: "https://i.imgur.com/iVuXj5q.png",

    // Facilities highlight
    living: "https://i.imgur.com/cV6UXJt.png",
    saunaRoom: "https://i.imgur.com/5fv3XpV.png",
    waterBath: "https://i.imgur.com/CWKkfzM.png",
    bbqGarden: "https://i.imgur.com/hy0iFjk.png",
    relax: "https://i.imgur.com/ZYm7Moq.png",
    bedroom: "https://i.imgur.com/edTm1L6.png",

    // Gallery
    gSauna1: "https://i.imgur.com/5fv3XpV.png",
    gSauna2: "https://i.imgur.com/iVuXj5q.png",
    gWaterBath: "https://i.imgur.com/CWKkfzM.png",
    gShower: "https://i.imgur.com/x3PluMu.png",
    gRelax: "https://i.imgur.com/ZYm7Moq.png",
    gLiving: "https://i.imgur.com/cV6UXJt.png",
    gDining: "https://i.imgur.com/Y4B9ZSm.png",
    gBed1: "https://i.imgur.com/o1cZ8Id.png",
    gBed2: "https://i.imgur.com/QYfQUM1.png",
    gExterior1: "https://i.imgur.com/xtO6yke.png",
    gExterior2: "https://i.imgur.com/KWeVpXq.png",
    gSunset: "https://i.imgur.com/LL2QPJp.png",
    gWinter: "https://i.imgur.com/TPZGVxt.png",
    gEntrance: "https://i.imgur.com/ngZvKs6.png",

    // Option / Nearby
    optBbq: "https://i.imgur.com/wyo1DAc.png",
    optLate: "https://i.imgur.com/4UNMIEa.png",
    optAmenity: "https://i.imgur.com/pvCyjt8.png",
    nearMetasequoia: "https://i.imgur.com/QlpxxZd.png",
    nearHakodate: "https://i.imgur.com/amTnOKq.png",
    nearShirahige: "https://i.imgur.com/qzIdTBo.png",
    nearCafe: "https://i.imgur.com/nsNfk9G.png",
    nearOutlet: "https://i.imgur.com/4RmZ7fT.png",

    // Reservation banner
    reservationBg: "https://i.imgur.com/wyo1DAc.png",
};

export const siteContent = {
    site: {
        name: "サウナヴィラ -碧-",
        nameEn: "VILLA AO",
        nameJp: "サウナヴィラ -碧-",
        location: "Takashima, Shiga",
        tagline: "都会ではできない、大音量サウナ",
        description:
            "滋賀県高島市、田園風景を望むサウナ付き一棟貸しヴィラ。最高100℃のサウナ・最低14℃の水風呂。YouTube/Netflix視聴可。最大10名で貸切。",
        url: "https://ao-villa.vercel.app",
        email: "info@ao-villa.com",
        instagram: "https://www.instagram.com/ao_villa/",
        line: "",
    },

    /** 予約ボタンの遷移先 (redirect-tracker 経由でCTA計測) */
    booking: {
        url: "https://redirect-tracker-eta.vercel.app/api/redirect?p=ao&s=direct",
        label: "ご予約",
        labelLong: "空きカレンダーを見る",
    },

    /** 閲覧数カウンタ (redirect-tracker のAPI) */
    tracker: {
        propertyId: "ao",
        origin: "https://redirect-tracker-eta.vercel.app",
    },

    /** バーガードロワー & フッター用ナビ (EN/JPペア) */
    navigation: [
        { en: "Reservation", jp: "ご予約", href: "/reservation" },
        { en: "Concept", jp: "コンセプト", href: "/concept" },
        { en: "Facilities", jp: "設備", href: "/facilities" },
        { en: "Gallery", jp: "ギャラリー", href: "/gallery" },
        { en: "Option", jp: "追加プラン", href: "/option" },
        { en: "Leisure", jp: "周辺施設", href: "/leisure" },
        { en: "FAQ", jp: "よくある質問", href: "/faq" },
        { en: "Contact", jp: "お問い合わせ", href: "/contact" },
    ],

    hero: {
        wordmarkEn: "VILLA AO",
        wordmarkJp: "サウナで映画も楽しめる、貸切ヴィラ",
        subtitle: "Sauna Private Villa — Takashima",
        images: [IMG.heroSauna, IMG.heroExterior, IMG.heroSaunaWinter],
        ctaLabel: "空きカレンダーを見る",
    },

    /** 01 SAUNA — サウナ室の特徴 */
    concept: {
        en: "SAUNA",
        jp: "サウナ",
        leadCopy:
            "AOのサウナは、自分のためだけの一台。温度も、音量も、観るものも、すべて自由に。都会ではできない、究極のサウナ体験を。",
        photo: IMG.concept,
        features: [
            {
                icon: "streaming" as const,
                title: "動画視聴",
                sub: "Streaming Inside",
                body: "サウナ室にTV完備。お気に入りを観ながら、じっくり整う。",
                badges: ["NETFLIX", "YOUTUBE", "PRIME"],
            },
            {
                icon: "volume" as const,
                title: "大音量OK",
                sub: "Loud Volume",
                body: "周辺住宅なし。ライブ映像も音楽も、爆音で楽しめる。",
                badges: [] as string[],
            },
            {
                icon: "temp" as const,
                title: "最高 110℃",
                sub: "Up to 110°C",
                body: "温度はセルフコントロール。低温も限界も、自由自在。",
                badges: [] as string[],
            },
            {
                icon: "loyly" as const,
                title: "セルフロウリュ",
                sub: "Self Löyly",
                body: "ストーンに水をかけて自由にロウリュ。アロマで香りも。",
                badges: [] as string[],
            },
        ],
    },

    /** 02 FACILITIES — 設備 */
    facilities: {
        en: "FACILITIES",
        jp: "主要設備",
        leadCopy: "古民家200㎡を最大10名で貸切。サウナ、リビング、寝室すべてに、こだわりを。",
        illustration: null as string | null,
        photo: IMG.living,
        items: [
            {
                en: "Private Sauna",
                jp: "貸切サウナ",
                note: "最高100℃調整可・セルフロウリュ・YouTube視聴可",
                image: IMG.gSauna2,
                detail:
                    "サウナ室にTV完備。YouTube・アニメ・ライブ映像をロウリュの蒸気の中で楽しめる、AOならではの体験。温度はセルフで調整可能、最高100℃まで。セルフロウリュで好きな香りのアロマを。",
            },
            {
                en: "Cold Bath",
                jp: "水風呂",
                note: "最低14℃キンキン",
                image: IMG.gWaterBath,
                detail:
                    "サウナの後は深々と冷えた14℃の水風呂へ。ヴィラ専用設計でいつでも冷たさをキープ。ととのいの質を底上げします。",
            },
            {
                en: "Cool Down Space",
                jp: "整いスペース",
                note: "インフィニティチェア × 5・屋外外気浴",
                image: IMG.gRelax,
                detail:
                    "屋外のインフィニティチェア5台。田園風景を眺めながらの外気浴は、四季ごとに違う表情を見せてくれます。",
            },
            {
                en: "BBQ Garden",
                jp: "BBQガーデン",
                note: "コンロ ¥2,200・食材持込",
                image: IMG.bbqGarden,
                detail:
                    "コンロ完備で食材だけ持ち込めばOK。広い庭で田園風景に囲まれ、深夜まで気兼ねなくBBQが楽しめます。",
            },
            {
                en: "Living Room",
                jp: "リビング",
                note: "75型TV / HDMI / 10名以上着席可",
                image: IMG.gLiving,
                detail:
                    "75型TVでYouTube・Netflix・プレゼン投影が可能。10名以上着席できる大テーブルがあり、合宿・打ち合わせ・ホームパーティーに最適。",
            },
            {
                en: "Bedrooms",
                jp: "寝室2室",
                note: "セミダブル7台 + 和室布団3組",
                image: IMG.gBed1,
                detail:
                    "セミダブルベッド7台の洋室と、布団3組の和室の2部屋構成。最大10名様までゆったり休めます。",
            },
            {
                en: "Full Kitchen",
                jp: "フルキッチン",
                note: "冷蔵庫 / 電子レンジ / 卓上IH × 2",
                image: IMG.gDining,
                detail:
                    "カトラリー・調理道具一式・冷蔵庫・電子レンジ・卓上IH × 2。食材を持ち込めば自炊も簡単。スーパー・コンビニは車10分圏内。",
            },
            {
                en: "Free Parking",
                jp: "敷地内駐車場",
                note: "無料・台数余裕あり",
                image: IMG.gExterior1,
                detail:
                    "敷地内に無料駐車スペース。複数台でお越しいただいても余裕を持って駐車いただけます。",
            },
        ],
    },

    /** 03 GALLERY — 写真カルーセル */
    gallery: {
        en: "GALLERY",
        jp: "写真を見る",
        leadCopy: "サウナ、リビング、寝室、外観 — 館内の様子をご紹介します。",
        images: [
            { src: IMG.gSauna1, caption: "サウナ室 100℃" },
            { src: IMG.gSauna2, caption: "サウナ室 TV付き" },
            { src: IMG.gWaterBath, caption: "水風呂 14℃" },
            { src: IMG.gShower, caption: "シャワースペース" },
            { src: IMG.gRelax, caption: "整いスペース" },
            { src: IMG.gLiving, caption: "リビング" },
            { src: IMG.gDining, caption: "ダイニング" },
            { src: IMG.gBed1, caption: "寝室 (セミダブル × 7)" },
            { src: IMG.gBed2, caption: "和室 (布団 × 3)" },
            { src: IMG.gExterior1, caption: "外観" },
            { src: IMG.gSunset, caption: "夕焼けの庭" },
            { src: IMG.gWinter, caption: "冬の外観" },
            { src: IMG.gEntrance, caption: "玄関" },
            { src: IMG.gExterior2, caption: "外観 別アングル" },
        ],
    },

    /** 04 ACCESS */
    access: {
        en: "ACCESS",
        jp: "アクセス",
        leadCopy: "京都から1.5時間、大阪・名古屋から2時間。田園風景の中の隠れ家へ。",
        address: "〒520-1601 滋賀県高島市今津町日置前1332-1",
        postal: "520-1601",
        mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d136.0145722!3d35.4243012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600193036b47b653%3A0xae4ce47a9fda2c78!2sSauna+Private+Villa+AO!5e0!3m2!1sja!2sjp",
        externalMapUrl: "https://maps.app.goo.gl/?q=Sauna+Private+Villa+AO",
        car: [
            { from: "京都", time: "車 約1.5h" },
            { from: "大阪", time: "車 約2h" },
            { from: "名古屋", time: "車 約2h" },
        ],
        train: "JR「近江今津」駅 → タクシーで約9分",
    },

    /** 05 OPTION — 追加プラン カルーセル */
    options: {
        en: "OPTION",
        jp: "追加プラン",
        leadCopy: "滞在をより豊かにする、追加プランをご用意しています。",
        items: [
            { src: IMG.bbqGarden, en: "BBQ Grill", jp: "BBQコンロ利用", price: "¥2,200", desc: "コンロ完備で食材だけ持ち込めばOK。田園風景の中、深夜まで気兼ねなく。予約時にお申し付けください。" },
        ],
    },

    /** 06 LEISURE — 周辺施設 カルーセル */
    nearby: {
        en: "LEISURE",
        jp: "周辺施設",
        leadCopy: "ヴィラから少し足を伸ばすと、湖西の魅力にも触れられます。",
        items: [
            { src: IMG.nearMetasequoia, en: "Metasequoia Avenue", jp: "メタセコイア並木", time: "車9分", desc: "全長2.4kmの並木道。四季ごとに表情を変える絶景スポット。" },
            { src: IMG.nearHakodate, en: "Hakodateyama", jp: "箱館山ゴンドラ", time: "車4分", desc: "琵琶湖を見下ろす展望。冬はスキー、夏はゆり園。" },
            { src: IMG.nearShirahige, en: "Shirahige Shrine", jp: "白鬚神社", time: "車30分", desc: "湖中の鳥居が印象的な、近江最古の神社。" },
            { src: IMG.nearCafe, en: "Local Cafe", jp: "パフェ専門店 LAMP", time: "車10分", desc: "湖西の人気カフェ。地元食材のパフェが看板。" },
            { src: IMG.nearOutlet, en: "Ryuoh Outlet", jp: "竜王アウトレット", time: "車60分", desc: "国内外250以上のブランドが揃う大型アウトレットモール。立ち寄りに最適。" },
        ],
    },

    /** 末尾の3スクエアタイル */
    trio: [
        { en: "Gallery", jp: "ギャラリー", href: "/gallery", image: IMG.gLiving },
        { en: "Reserve", jp: "ご予約", href: "/reservation", image: IMG.bbqGarden },
        { en: "Instagram", jp: "@ao_villa", href: "https://www.instagram.com/ao_villa/", image: IMG.gSunset, external: true },
    ],

    /** FAQ */
    faq: [
        { q: "音楽や大声はOK？", a: "周辺に住宅がないため、24時間音楽・大声OK。サウナ内ではYouTubeで好きなライブ映像や音楽を爆音で楽しめます。" },
        { q: "チェックイン・アウトの時間は？", a: "チェックイン 15:00〜20:00 (セルフチェックイン) / チェックアウト 〜10:00。" },
        { q: "最大何名まで？", a: "最大10名様。寝室2室 (セミダブル7台 + 和室布団3組)、床面積200㎡。" },
        { q: "食事の提供はある？", a: "食事の提供はございません。フルキッチン完備。車で約10分の場所にスーパー・コンビニあり。塩・胡椒・油等の消耗品はご持参ください。" },
        { q: "サウナの利用は別料金？", a: "宿泊料金に含まれております。チェックインからチェックアウトまで自由にご利用いただけます。" },
        { q: "BBQはできる？", a: "BBQコンロ利用料 ¥2,200(税込)。食材・調味料・炭はご自身でご準備ください。予約時にお申し付けください。" },
        { q: "駐車場は？", a: "敷地内に無料駐車スペースをご用意しております。" },
        { q: "キャンセル料は？", a: "2週間前まで無料 / それ以降は100%。" },
        { q: "喫煙は？", a: "建物は伝統的な木造建築のため室内は完全禁煙。室外 (BBQエリア等) での喫煙は可能です。" },
        { q: "旅館業の許可は？", a: "滋賀県高島保健所より、旅館業法の許可を取得しています (滋賀県指令 高保 第61号)。" },
    ],

    /** 予約バナー (中央に配置) */
    reservationBanner: {
        en: "RESERVATION",
        jp: "ご予約はこちらから",
        backgroundImage: IMG.reservationBg,
    },

    /** Reservation ページ用 */
    reservation: {
        intro: "下記のリンクから空室カレンダーをご確認の上、ご予約ください。",
        engineLabel: "空きカレンダーを見る",
        engineUrl: "https://redirect-tracker-eta.vercel.app/api/redirect?p=ao&s=reservation",
        notes: [
            "予約はAirhostまたは直URL経由で確定します",
            "キャンセルポリシー: 2週間前まで無料 / それ以降100%",
            "領収書のご希望は、予約完了後にInstagram DMよりご連絡ください",
            "平日 ¥9,800〜 / 週末 ¥14,000〜 (1名あたり目安・最終料金は予約カレンダーをご確認ください)",
        ],
    },

    /** Contact ページ用 */
    contact: {
        intro:
            "ご質問・ご要望はInstagram DMからお気軽にお問い合わせください。10年運営・スーパーホスト・★4.92/25件のレビュー。",
        channels: [
            { label: "Instagram DM", value: "@ao_villa", href: "https://www.instagram.com/ao_villa/" },
            { label: "Email", value: "info@ao-villa.com", href: "mailto:info@ao-villa.com" },
        ],
    },
};

export type SiteContent = typeof siteContent;
