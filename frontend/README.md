## Svagheter

Komponenter Savedjobs och Jobslist har samma kod med små justeringar. det gör att om man gör en ändring på en behöver jag ändra på den andra eftersom de hanterar samma logik för att spara jobb. komponenterna och funktionerna kunde ha faktoriserats för att enklare hantera dataflödet för props. Projektet använder React Router som gör det möjligt för page routing. Nackdelen är att logiken för att ändra page route är utspritt mellan olika komponenter i projektet som gör det tidskrävande och komplicerat att navigera mellan filer. Jämfört med Next.js är page routing inbyggt i Reactramverket och rutterna är en del av filträdet som gör det att enklare hitta det man letar efter. Dessutom används hanterar ramverket renderingen och page routing i bakgrunden och den huvudsakliga komponent för navigering mellan olika sidor kallas för Link till skillnad från React Router har flera olika komponenter som Outlet, Link och Navigate för att åstadkomma samma funktionalitet.

## Styrkor

Koden är relativt modulärt genom uppdelningen av funktioner och komponenter. Ifall en ny funktionalitet implementeras för hemsidan som som exempelvis spara jobb för en användare var det möjligt att återanvända liknande funktionalitet från den befintliga koden. Det effektiviserar arbetet och gör koden enklare att förstå genom att göra det konsekvent. Savedjobs och Jobslist är samma komponentet med några få justeringar för att anpassa till deras funktionalitet som animationer och konditionell rendering för att visa den rätta fullständiga beskrivningen på ett jobb från listan. Projektet använder även Redux Toolkit för att hantera states globalt som gör det smidigare att ändra och hämta states mellan olika komponenter utan att tänka. Reducers blir simplifierade med Immer som gör det möjligt att ändra på immutable värden.

# Vecka 10

## Allmänt om ramverket React: Hur/Varför uppkom det? Vad är dess kännetecken?

React gör det möjligt att skapa återanvändbara komponenter för användargränssnittet som kan förändras över tid. Istället för att vara bunden till en statisk struktur från HTML ger det dig friheten att flexibelt ändra komponenter på sidan med React. Det innebär att du kan utveckla en applikation på en enda sida. React använder sig av ett programmeringskoncept som kallas Virtual DOM. Principen är att data sparas i minnet och representerar strukturen av användargränssnittet och synkroniseras med den "riktiga" DOM:en, vilket gör det möjligt att deklarativt bestämma vilken status användargränssnittet ska matcha på DOM:en. Detta innebär att du inte behöver tänka på attributmanipulation, händelsehantering och manuell DOM-uppdatering.
https://legacy.reactjs.org/docs/faq-internals.html
https://legacy.reactjs.org/blog/2013/06/05/why-react.html

## Vad är JSX?

JSX är en förlängning av JavaScript som gör det möjligt att skriva HTML-syntax i Javascript-filen.
https://react.dev/learn/writing-markup-with-jsx

## Vad är en komponent i React?

Komponenter är återanvändbara funktioner som returnerar HTML.
https://www.w3schools.com/react/react_components.asp

## Vad är props i React?

Props står för properties och används som argument i komponenter.
https://www.w3schools.com/react/react_props.asp

## Vad menas med one-way-dataflow?

Det betyder att data bara överförs genom en riktning. Datan från parent elementet, alltså props kan bara överföras från parent till child och inte vice versa. Därför kan inte child-komponenter ändra eller uppdatera data som ger utvecklaren mer kontroll, tydlighet och felsökning av dataflöden.
https://www.educative.io/answers/what-is-unidirectional-data-flow-in-react

## Hur kan man använda sig av conditionell rendering i React?

Man kan rendera specifika komponenter när ett visst villkor uppnås. Om man exempelvis försöker logga in som användare kan man visa ett felmeddelande när misslyckades.  
<br>
<br>

# Vecka 11

## Vad är state i React?

Det är intern data som styrs och uppdateras av komponenten. När state ändras renderas komponenten om.

## Vad är det för skillnad mellan state och props?

Props är data som kommer in från parents till komponenter som parametrar(props står för properties) och är read-only.

## Vad menas med en kontrollerad komponent i React?

Det är en komponent som håller ett värde som React tvingar uppdatera varje gång värdet ändras. https://react.dev/reference/react-dom/components input#controlling-an-input-with-a-state-variable

## Vad är en callback handler?

Det är en funktion som skickas som en prop till en komponent och körs där.

## Vad menas med "lifting state up"?

Det betyder att man flyttar en state till en gemensam komponent som fler komponenter kan använda.

## Vad är syftet med useEffect-hook i React?

Syftet med UseEffect är att synkronisera en komponent med externa källor som en api fetch eller timer.
https://react.dev/reference/react/useEffect

## Vad är syftet kring den s.k dependency-arrayen i UseEffect?

Ifall dependency-arrayen skulle ändra värde kommer UseEffect att köra igen och omrendera komponenten.
<br>
<br>

# Vecka 12

# Vad menas med Reacts ekosystem?

Det är redskap och bibliotek som används med React när man utvecklar webbsidor.
Nämn några andra viktiga bibliotek i Reacts ekosystem förutom React Router och React Hook Form
Next.js(React-ramverk för server side rendering) Redux Toolkit(ramverk för att hantera states), Headless UI(Tailwind-ramverk för att skapa UI)

# Vad är fördelen med att använda React Hook Form?

Behöver inte lägga till en onchange och value för varje input och det blir enklare att läsa. Dessutom kommer det med funktioner och objekt som gör det enklare för exempelvis felhantering(error) och registrera informationen från formen(register)

# Vad är syftet med useContext? Vilket problem med props löser den?

UseContext är ett sätt att hantera states globalt och med den kan flera komponenter få tillgång till en state utan att skicka den som props genom flera komponenter.

# Vilka fördelar finns det att använda Tailwind / nackdelar?

Om man kan de flesta klassnamnen för egenskaperna kan det vara smidigt att skriva och det finns redan färdiga css-egenskaper som man skriver in. Kan dock vara svårläst med massa Tailwind CSS i komponenterna
<br>
<br>

# Vecka 14-15

## Vad är Redux Toolkit?

Redux Toolkit är till för att hantera states globalt. Det simplifierar sättet att använda dispatch och UseReducers genom att exempelvis använda Immer som gör att immutable värden blir mutable.

## När, i vilka situationer vill man använda Redux Toolkit?

När ett projekt börjar innehålla flera olika states och sidor kan det bli svårt att följa dataflödet. Därför kan Redux Toolkit samla alla states och dispatch på ett ställe som gör koden i komponenterna tydligare att läsa och felhanteringen enklare. När flera olika komponenter delar samma state och behöver ändra den kan det också vara bra att använda Redux Toolkit istället för att skicka states som props genom flera komponenter.

## Beskriv typiska områden hur man använder Typescript i React? (ex props, event, useReducer, etc)

Man ger variabler som gör det enklare att veta vilken typ av data som hanteras. I exempelvis props och parametrar i funktioner blir det tydligare när man typar variablerna och får ett felmeddelande. Ett annat exempel på användningen av Typescript är när man dekonstruerar objekt för att skapa komponenter med objektets egenskaper. Det ger mer information över vad objekten innehåller och komponenterna blir tydligare när värdena är självförklarande med objektens egenskaper.
