// ======================================
// TRADESPARKSITE.PRO DERIV CONNECTION
// ======================================

// APP CONFIG

const APP_ID = "33p7PVqGTbhzPMv1GNtXr";

const REDIRECT_URL =
"https://alphones142775-cmyk.github.io/Trading-platform/";
// Get authenticated WebSocket URL via OTP endpoint
// Note: This REST call requires your authorization token
const otpResponse = await fetch(
  `https://api.derivws.com/trading/v1/options/accounts/${accountId}/otp`,
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_AUTHORIZATION_TOKEN',  // PAT or JWT token
      'Deriv-App-ID': 'YOUR_APP_ID'
    }
  }
);

const otpResult = await otpResponse.json();
const wsUrl = otpResult.data.url;
console.log('Authenticated WebSocket URL:', wsUrl);
// Output: wss://api.derivws.com/trading/v1/options/ws/demo?otp=abc123xyz789
// ======================================
// LOADING SCREEN
// ======================================

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.display = "none";
        document.getElementById("app").style.display = "block";

    }, 3000);

});
// Connect to Options WebSocket using the authenticated URL from OTP response
// The URL already contains the correct endpoint (demo/real) and authentication
const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  console.log('Connected to Options trading WebSocket');
  // Connection is now authenticated and ready for trading
};

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  console.log('Received:', data);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};
// ======================================
// LIVE CLOCK
// ======================================

setInterval(() => {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString();

}, 1000);
// Once connected, you can send trading commands through WebSocket
// Example: Get account balance
ws.send(JSON.stringify({
  balance: 1,
  subscribe: 1,
  req_id: 1
}));

// Example: Subscribe to tick stream
ws.send(JSON.stringify({
  ticks: "1HZ100V",
  subscribe: 1,
  req_id: 2
}));

// Example: Get price proposal
ws.send(JSON.stringify({
  proposal: 1,
  amount: 10,
  basis: "stake",
  contract_type: "MULTDOWN",
  currency: "USD",
  duration_unit: "s",
  multiplier: 10,
  underlying_symbol: "1HZ100V",
  subscribe: 1,
  req_id: 3
}));
// ======================================
// DERIV LOGIN BUTTON
// ======================================

document
.getElementById("loginBtn")
.addEventListener("click", (aurhorize) => {

    const authUrl =
        `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&l=EN`;

    window.location.href = authUrl;

});

// ======================================
// READ TOKEN FROM URL
// ======================================

function getQueryParam(name) {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get(name);
async function setupOptionsTrading() {
  const AUTH_TOKEN = 'YOUR_AUTHORIZATION_TOKEN';  // PAT or JWT token
  const APP_ID = 'YOUR_APP_ID';                   // App ID from registered application
  const API_BASE = 'https://api.derivws.com';
  const accountId = 'YOUR_ACCOUNT_ID';            // Your demo or real account ID

  try {
    // Step 1: Get authenticated WebSocket URL (REST, requires authorization token)
    const otpResponse = await fetch(
      `${API_BASE}/trading/v1/options/accounts/${accountId}/otp`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
          'Deriv-App-ID': APP_ID
        }
      }
    );

    if (!otpResponse.ok) throw new Error(`HTTP error! status: ${otpResponse.status}`);
    const otpData = await otpResponse.json();
    const wsUrl = otpData.data.url;
    console.log('✓ Authenticated WebSocket URL obtained');

    // Step 2: Connect to WebSocket using the authenticated URL
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('✓ WebSocket connected');

      // Step 3: Start trading
      // Subscribe to balance updates
      ws.send(JSON.stringify({
        balance: 1,
        subscribe: 1,
        req_id: 1
      }));

      // Subscribe to ticks
      ws.send(JSON.stringify({
        ticks: "1HZ100V",
        subscribe: 1,
        req_id: 2
      }));
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.msg_type === 'balance') {
        console.log('Balance:', data.balance.balance, data.balance.currency);
      }

      if (data.msg_type === 'tick') {
        console.log('Tick:', data.tick.quote);
      }
    };

    return ws;

  } catch (error) {
    console.error('Setup failed:', error);
    throw error;
  }
}

// Run the setup
setupOptionsTrading().then(ws => {
  console.log('Trading setup complete. WebSocket ready for operations.');
}).catch(err => {
  console.error('Failed to setup trading:', err);
});
}

const token =
    getQueryParam("token");

if (token) {

    localStorage.setItem(
        "deriv_token",
        token
    );

}

// ======================================
// CONNECT TO DERIV
// ======================================

const ws = new WebSocket(
    `wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`
);

ws.onopen = () => {

    console.log(
        "Connected To Deriv"
    );// PAT-Based Authentication: REST API
const AUTH_TOKEN = 'YOUR_AUTHORIZATION_TOKEN';  // Your PAT token
const APP_ID = 'YOUR_APP_ID';

// All REST calls use the authorization token as a Bearer token
const response = await fetch('https://api.derivws.com/trading/v1/options/accounts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${AUTH_TOKEN}`,    // Authorization token (PAT)
    'Deriv-App-ID': APP_ID,                      // App ID from registered application
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    currency: 'USD',
    group: 'row',
    account_type: 'demo'
  })
});

const result = await response.json();
console.log('Authenticated REST call successful:', result);

    const savedToken =
        localStorage.getItem(
            "deriv_token"
        );

    if (savedToken) {

        ws.send(
            JSON.stringify({

                authorize:
                savedToken

            })
        );

    }

};

// ======================================
// HANDLE DERIV RESPONSES
// ======================================

ws.onmessage = (msg) => {
// OAuth 2.0 Authentication Flow (Authorization Code with PKCE)
const CLIENT_ID = 'YOUR_CLIENT_ID';
const REDIRECT_URI = 'https://your-app.com/callback';

// --- PKCE Helper Functions ---
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Step 1: Generate PKCE values and redirect user to authorization endpoint
const codeVerifier = generateCodeVerifier();
const codeChallenge = await generateCodeChallenge(codeVerifier);
const state = crypto.randomUUID();

sessionStorage.setItem('code_verifier', codeVerifier);
sessionStorage.setItem('oauth_state', state);

const authUrl = new URL('https://auth.deriv.com/oauth2/auth');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('scope', 'trade account_manage');
authUrl.searchParams.set('state', state);
authUrl.searchParams.set('code_challenge', codeChallenge);
authUrl.searchParams.set('code_challenge_method', 'S256');

window.location.href = authUrl.toString();

// Step 3: Handle the callback
const urlParams = new URLSearchParams(window.location.search);
const authorizationCode = urlParams.get('code');
const returnedState = urlParams.get('state');

const savedState = sessionStorage.getItem('oauth_state');
if (returnedState !== savedState) {
  throw new Error('State mismatch: possible CSRF attack');
}

// Step 4: Exchange the authorization code for tokens
const savedVerifier = sessionStorage.getItem('code_verifier');
const tokenResponse = await fetch('https://auth.deriv.com/oauth2/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    code: authorizationCode,
    redirect_uri: REDIRECT_URI,
    code_verifier: savedVerifier
  })
});

const tokenData = await tokenResponse.json();
const accessToken = tokenData.access_token;
console.log('Access token obtained, expires in', tokenData.expires_in, 'seconds');

// Step 6: Use the access token for authenticated API calls
const response = await fetch('https://api.derivws.com/trading/v1/options/accounts', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Deriv-App-ID': CLIENT_ID,
    'Content-Type': 'application/json'
  }
});

const result = await response.json();
console.log('Authenticated API call successful:', result);
    const data =
        JSON.parse(msg.data);

    console.log(data);

    // ACCOUNT LOGIN SUCCESS

    if (
        data.msg_type ===
        "authorize"
    ) {
// Request OTP — returns a WebSocket URL
const response = await fetch(
  'https://api.derivws.com/trading/v1/options/accounts/DOT90004580/otp',
  {
    method: 'POST',
    headers: {
      'Deriv-App-ID': 'YOUR_APP_ID',
      'Authorization': 'Bearer YOUR_AUTH_TOKEN',
    },
  }
);
const { data } = await response.json();
// data.url === "wss://api.derivws.com/trading/v1/options/ws/demo?otp=abc123xyz789"
Step 2: Connect to the WebSocket
        console.log(
            "Authorized"
        );
        
// Connect using the URL from the OTP response
const ws = new WebSocket(data.url);

ws.onopen = () => {
  console.log('Connected to Options trading WebSocket');
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received:', message);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
    
};      
        // BALANCE

        functional (
            document.getElementById(
                "{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Balance (request)",
  "description": "Get the account's balance",
  "type": "object",
  "auth_required": 1,
  "auth_scopes": ["trade"],
  "additionalProperties": false,
  "required": ["balance"],
  "properties": {
    "balance": {
      "description": "Must be `1`",
      "type": "integer",
      "enum": [1]
    },
    "subscribe": {
      "description": "[Optional] If set to 1, will send updates whenever the balance changes.",
      "type": "integer",
      "enum": [0, 1]
    },
    "passthrough": {
      "description": "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
      "type": "object"
    },
    "req_id": {
      "description": "[Optional] Used to map request to response.",
      "type": "integer"
    }
  }
}"
            )
        ) {

            document.getElementById(
                "balance"
            ).innerHTML =
            "$" +
            data.authorize.balance;

        }

        // START LIVE MARKET STREAM

        ws.send(
            JSON.stringify({

                <deriv>: "live markets",
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Ping (request)",
  "description": "To send the ping request to the server. Mostly used to test the connection or to keep it alive.",
  "type": "object",
  "auth_required": 0,
  "additionalProperties": false,
  "required": ["ping"],
  "properties": {
    "ping": {
      "description": "Must be `1`",
      "type": "integer",
      "enum": [1]
    },
    "passthrough": {
      "description": "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
      "type": "object"
    },
    "req_id": {
      "description": "[Optional] Used to map request to response.",
      "type": "integer"
    }
  }
}
            })
        );

    }
// Step 1: Get authenticated WebSocket URL via REST (requires authorization token)
const otpResponse = await fetch(
  `https://api.derivws.com/trading/v1/options/accounts/${accountId}/otp`,
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_AUTHORIZATION_TOKEN',  // PAT or JWT token
      'Deriv-App-ID': 'YOUR_APP_ID'
    }
  }
);

const otpResult = await otpResponse.json();
const wsUrl = otpResult.data.url;
// The URL already includes the correct endpoint and authentication
// Output: wss://api.derivws.com/trading/v1/options/ws/demo?otp=abc123xyz789

// Step 2: Connect to WebSocket using the authenticated URL
const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  console.log('WebSocket authenticated and connected');
  // Ready for trading operations
};
    // After authentication...

// 1. Get active symbols
ws.send(JSON.stringify({
  active_symbols: "brief",
  req_id: 3
}));

// 2. Subscribe to ticks
ws.send(JSON.stringify({
  ticks: "1HZ100V",
  subscribe: 1,
  req_id: 4
}));

// 3. Get price proposal
ws.send(JSON.stringify({
  proposal: 1,
  amount: 10,
  basis: "stake",
  contract_type: "MULTDOWN",
  currency: "USD",
  duration_unit: "s",
  multiplier: 10,
  underlying_symbol: "1HZ100V",
  subscribe: 1,
  req_id: 5
}));

// 4. Buy the contract (when ready)
// Use proposal ID from previous response
ws.send(JSON.stringify({
  buy: "PROPOSAL_ID_HERE",
  price: 100,
  req_id: 6
}));

// 5. Monitor contract status
ws.send(JSON.stringify({
  proposal_open_contract: 1,
  contract_id: CONTRACT_ID,
  subscribe: 1,
  req_id: 7
}));
 // Connect to the public WebSocket endpoint (no authentication required)
const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3');

ws.onopen = () => {
  // Get available symbols
  ws.send(JSON.stringify({
    active_symbols: "brief",
    product_type: "basic",
    req_id: 1
  }));

  // Subscribe to tick stream
  ws.send(JSON.stringify({
    ticks: "1HZ100V",
    subscribe: 1,
    req_id: 2
  }));

  // Get historical data
  ws.send(JSON.stringify({
    ticks_history: "1HZ100V",
    count: 100,
    end: "latest",
    style: "ticks",
    req_id: 3
  }));
};

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);

  if (data.msg_type === 'active_symbols') {
    console.log('Available symbols:', data.active_symbols);
  }

  if (data.msg_type === 'tick') {
    console.log('Current price:', data.tick.quote);
  }

  if (data.msg_type === 'history') {
    console.log('Historical data:', data.history);
  }
};
    
    // LIVE TICKS

    if (
        data.msg_type ===
        "tick"
    ) {
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Ticks Stream (request)",
  "description": "Initiate a continuous stream of spot price updates for a given symbol.",
  "type": "object",
  "auth_required": 0,
  "additionalProperties": false,
  "required": ["ticks"],
  "properties": {
    "ticks": {
      "description": "The short symbol name or array of symbols (obtained from `active_symbols` call).",
      "oneOf": [
        {
          "type": "string",
          "pattern": "^\\w{2,30}$"
        },
        {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^\\w{2,30}$"
          }
        }
      ]
    },
    "subscribe": {
      "description": "[Optional] If set to 1, will send updates whenever a new tick is received.",
      "type": "integer",
      "enum": [1]
    },
    "passthrough": {
      "description": "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
      "type": "object"
    },
    "req_id": {
      "description": "[Optional] Used to map request to response.",
      "type": "integer"
    }
  }
}
        console.log(
            "LIVE PRICE:",
            data.tick.quote
        );
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Ticks History (request)",
  "description": "Get historic tick data for a given symbol.",
  "type": "object",
  "auth_required": 0,
  "additionalProperties": false,
  "required": ["ticks_history", "end"],
  "properties": {
    "ticks_history": {
      "description": "Short symbol name (obtained from the `active_symbols` call).",
      "type": "string",
      "pattern": "^\\w{2,30}$"
    },
    "adjust_start_time": {
      "description": "[Optional] 1 - if the market is closed at the end time, or license limit is before end time, adjust interval backwards to compensate.",
      "type": "integer",
      "enum": [1]
    },
    "count": {
      "description": "[Optional] An upper limit on ticks to receive.",
      "type": "integer",
      "default": 1000
    },
    "end": {
      "description": "Epoch value representing the latest boundary of the returned ticks. If `latest` is specified, this will be the latest available timestamp.",
      "type": "string",
      "pattern": "^(latest|[0-9]{1,10})$"
    },
    "granularity": {
      "description": "[Optional] Only applicable for style: `candles`. Candle time-dimension width setting. (default: `60`).",
      "type": "integer",
      "enum": [
        60, 120, 180, 300, 600, 900, 1800, 3600, 7200, 14400, 28800, 86400
      ]
    },
    "start": {
      "description": "[Optional] Epoch value representing the earliest boundary of the returned ticks. \n- For `\"style\": \"ticks\"`: this will default to 1 day ago.\n- For `\"style\": \"candles\"`: it will default to 1 day ago if count or granularity is undefined.",
      "type": "integer",
      "maximum": 9999999999,
      "minimum": 0
    },
    "style": {
      "description": "[Optional] The tick-output style.",
      "type": "string",
      "default": "ticks",
      "enum": ["candles", "ticks"]
    },
    "subscribe": {
      "description": "[Optional] 1 - to send updates whenever a new tick is received.",
      "type": "integer",
      "enum": [1]
    },
    "passthrough": {
      "description": "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
      "type": "object"
    },
    "req_id": {
      "description": "[Optional] Used to map request to response.",
      "type": "integer"
    }
  }
}
    }

};

// ======================================
// WEBSOCKET ERRORS
// ======================================

ws.onerror = (err) => {
{
  "errors": [
    {
      "status": 400,
      "code": "ValidationError",
      "message": "Invalid account ID format"
    }
  ],
  "meta": {
    "endpoint": "/accounts/INVALID/otp",
    "method": "POST",
    "timing": 12
  }
}
{
  "errors": [
    {
      "status": 401,
      "code": "Unauthorized",
      "message": "Invalid or missing authentication credentials"
    }
  ],
  "meta": {
    "endpoint": "/accounts/DOT90004580/otp",
    "method": "POST",
    "timing": 45
  }
}
    console.error(
        "Deriv Error",
        err
    );

};
{
  "errors": [
    {
      "status": 500,
      "code": "InternalServerError",
      "message": "Failed to generate OTP"
    }
  ],
  "meta": {
    "endpoint": "/accounts/DOT90004580/otp",
    "method": "POST",
    "timing": 234
  }
}

// ======================================
// CONNECTION CLOSED
// ======================================

ws.onclose = () => {

    console.log(
        "Deriv Connection Closed"
    );

};

// ======================================
// TRADINGVIEW CHART
// ======================================

new TradingView.widget({

    container_id: "live market charts",

    autosize: true,

    symbol: "{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Active Symbols (request)",
  "description": "Retrieve a list of all currently active symbols (underlying markets upon which contracts are available for trading).",
  "type": "object",
  "auth_required": 0,
  "additionalProperties": false,
  "required": ["active_symbols"],
  "properties": {
    "active_symbols": {
      "description": "If you use `brief`, only a subset of fields will be returned.",
      "type": "string",
      "enum": ["full", "brief"]
    },
    "contract_type": {
      "description": "[Optional] The proposed contract type",
      "type": "array",
      "items": {
        "description": "",
        "type": "string",
        "enum": [
          "HIGHER",
          "LOWER",
          "MULTUP",
          "MULTDOWN",
          "UPORDOWN",
          "EXPIRYRANGE",
          "ONETOUCH",
          "CALLE",
          "ASIAND",
          "EXPIRYRANGEE",
          "DIGITDIFF",
          "DIGITMATCH",
          "DIGITOVER",
          "PUTE",
          "DIGITUNDER",
          "NOTOUCH",
          "CALL",
          "RANGE",
          "DIGITODD",
          "PUT",
          "ASIANU",
          "EXPIRYMISSE",
          "EXPIRYMISS",
          "DIGITEVEN",
          "TICKHIGH",
          "TICKLOW",
          "RESETCALL",
          "RESETPUT",
          "RUNHIGH",
          "RUNLOW",
          "ACCU",
          "VANILLALONGCALL",
          "VANILLALONGPUT",
          "TURBOSLONG",
          "TURBOSSHORT"
        ]
      }
    },
    "passthrough": {
      "description": "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
      "type": "object"
    },
    "req_id": {
      "description": "[Optional] Used to map request to response.",
      "type": "integer"
    }
  }
}",

    interval: "1",

    timezone: "{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Server Time (request)",
  "description": "Request back-end server epoch time.",
  "type": "object",
  "auth_required": 0,
  "additionalProperties": false,
  "required": ["time"],
  "properties": {
    "time": {
      "description": "Must be `1`",
      "type": "integer",
      "enum": [1]
    },
    "passthrough": {
      "description": "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.",
      "type": "object"
    },
    "req_id": {
      "description": "[Optional] Used to map request to response.",
      "type": "integer"
    }
  }
}",

    theme: "neon green",

    style: "1",

    locale: "en",

    toolbar_bg: "#131722",

    enable_publishing: true,

    allow_symbol_change: true

})

