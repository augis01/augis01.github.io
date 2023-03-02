<html lang="en">
    <head>
        <meta charset="UTF-8">

        <title>csgon1.com - Crash</title>
        <meta property="og:title" content="csgon1.com" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta property="og:description" content="" />

        <meta name="csrf-token" content="63rWLQI6W2YMswWrBZLCww00RRFrqaq8AjeJtALr" />
        <meta name="language" content="en" />
        <meta name="websocket" content="http://138.68.104.53:8080" />
        <meta name="game" content="crash" />
        <meta name="logged" content="@if (Auth::check()){{1}}@else{{0}}@endif" />
        <meta name="steamid" content="@if (Auth::check()){{Auth::user()->steamid}}@endif" />
        <meta name="username" content="@if (Auth::check()){{Auth::user()->username}}@endif"/>
        <meta name="avatar" content="@if (Auth::check()){{Auth::user()->avatar}}@endif"/>
        <meta name="token" content="{{$token}}"/>
        <meta name="tradeURL" content="@if (Auth::check() && Auth::user()->tradeurl){{'https://steamcommunity.com/tradeoffer/new/?partner='.(substr(Auth::user()->steamid,7) - 7960265728).'&token='.Auth::user()->tradeurl}}@endif"/>
        <meta name="time" content="{{$time}}"/>
        
        <meta name="viewport" content="width=1400, initial-scale=1">

        <link rel="icon" type="image/png" href="/favicon.png" />

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
        <link rel="stylesheet" href="/css/app.css">

		<style>
		.crash .top .box-history .history>div.win {
			color: #83d65b !important;
		}
	</style>
		<!-- NOTIF -->
		
		  <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async='async'></script>
  <script>
    var OneSignal = window.OneSignal || [];
    OneSignal.push(["init", {
      appId: "9d14001c-3a40-4683-a847-24a55237f42c",
      autoRegister: true, /* Set to true to automatically prompt visitors */
      subdomainName: 'csturbo.onesignal.com',
      /*
      subdomainName: Use the value you entered in step 1.4: http://imgur.com/a/f6hqN
      */
      httpPermissionRequest: {
        enable: true
      },
      notifyButton: {
          enable: false /* Set to false to hide */
      }
	  persistNotification: false // Automatically dismiss the notification after ~20 seconds in Chrome Deskop v47+
    }]);
  </script>
		
<!-- NOTIF -->	
    </head>
<body>
<nav>
    <div class="navbar-logo">
        <a href="/"><img src="/img/official.png"></a>
    </div>
        @if (Auth::check())
            <div class="navbar-player">
            <a href="/user/profile"><img class="player-avatar" src="{{Auth::user()->avatar}}"></a>
            <div class="player-text">
                <div class="welcome">Welcome</div>
                <div class="nickname">{{Auth::user()->username}}</div>
            </div>
            <div class="buttons">
                <a href="/user/profile"><i class="fa fa-cog" aria-hidden="true"></i></a>
                <a href="/auth/logout"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
            </div>
        </div>
        @else
        <div class="sign-in">
        <a href="/auth/login"><img src="/img/sign-in.png"></a>
    </div>
@endif
@if (Auth::check())
        <div class="balance" data-balance="{{Auth::user()->wallet}}"><div class="balance-icon"><img src="/img/icons-small/coins.png"></div> <span class="value">{{Auth::user()->wallet}}</span> <a href="/user/deposit"><i class="fa fa-plus-circle" aria-hidden="true"></i></a></div>
@endif        <ul class="navbar-pages">
        <li>
            <a href="/roulette" class="navbar-href">
                <div class="icons">
                    <div class="icon-big icon-roulette"></div>
                </div>
                <div class="info">Roulette</div>
            </a>
        </li>
		<li>
            <a href="/coinflip" class="navbar-href">
                <div class="icons">
                    <div class="icon-big icon-dice"></div>
                </div>
                <div class="info">Coin Flip</div>
            </a>
        </li>
		<li>
            <a href="/jackpot" class="navbar-href">
                <div class="icons">
                    <div class="icon-big icon-mines"></div>
                </div>
                <div class="info">Jackpot</div>
            </a>
        </li>
		<li>
            <a href="/crash" class="navbar-href active">
                <div class="icons">
                    <div class="icon-big icon-up"></div>
                </div>
                <div class="info new">Crash</div>
            </a>
        </li>
    </ul>

    <ul class="navbar-pages">
        <li>
            <a href="/user/deposit" class="navbar-href">
                <div class="icons">
                    <div class="icon-big icon-deposit"></div>
                </div>
                <div class="info">Deposit</div>
            </a>
        </li>
        <li>
            <a href="/user/withdraw" class="navbar-href">
                <div class="icons">
                    <div class="icon-big icon-store"></div>
                </div>
                <div class="info">Store</div>
            </a>
        </li>
    </ul>

    <ul class="navbar-pages">
        <li>
            <a href="/user/referrals" class="navbar-href">
                <div class="icons">
                    <div class="icon-big icon-referrals"></div>
                </div>
                <div class="info">Referrals</div>
            </a>
        </li>
        <li>
            <a href="/faq" class="navbar-href">
                <div class="icons">
                    <div class="icon-big icon-faq"></div>
                </div>
                <div class="info">FAQ</div>
            </a>
        </li>
		<li>
            <a href="/giveaway" class="navbar-href">
                <div class="icons">
                    <div class="icon-big icon-giveaway"></div>
                </div>
                <div class="info">Giveaway</div>
            </a>
        </li>
    </ul>


    <div class="navbar-img free-coins-area">
            <a href="/user/referrals" class="giveaway-img">
                <img src="/img/free-coins-nick.png">
            </a>
        </div>
            <!-- <div class="navbar-img giveaway-area">
            <a href="http://steamcommunity.com/groups/csgo_turbo" target="_blank" class="giveaway-img">
                <img src="/img/join-steam-group.png">
            </a>
        </div> -->
		<div class="navbar-img free-coins-area">
            <a href="https://twitter.com/realcsgoturbo" class="giveaway-img">
                <img src="/img/free-coins-twitter.png">
            </a>
        </div>
    <center><p style="font-size:14px;">&copy; 2017 csgon1.com</p></center>
    <div class="online"><img src="/img/icons-small/players.png"><span class="players-online">0</span></div>
</nav>

<div class="center">
    <div class="top-navigation">
        <div class="circleButton menu-toggle-button"><i class="fa fa-arrow-left" aria-hidden="true"></i></div>
        <div class="circleButton sound-toggle-button"><i class="fa fa-volume-up" aria-hidden="true"></i></div>
    </div>

    <div class="main-wrapper">
        <main>
                <div class="crash">
            <div class="top">
                <div class="top-box box-chart">
                    <div class="chart"></div>
                    <div class="chart-info"></div>
                </div>
                <div class="boxes">
                    <div class="top-box box-bet">
                        <div class="way">
                            <div class="manual-way active" data-show="manual" onclick="crash.setWay(this)">Manual</div>
                            <div class="automatic-way" data-show="automatic" onclick="crash.setWay(this)">Automatic (DISABLED)</div>
                        </div>
                        <div class="manual-way-content">
                            <div class="input-group">
                                <label for="bet-coins">Bet: <span>(min <span class="min-bet">100</span>, max <span class="max-bet">100,000</span>)</span> </label>
                                <input id="bet-coins" type="number" step="100" value="0" min="0">
                            </div>
                            <div class="input-group">
                                <label for="bet-cashout">Auto cashout at (0 = disabled): </label>
                                <input type="number" min="1" step="0.01" value="2" id="bet-cashout">
                            </div>

                            <button class="bet-butt active" onclick="crash.bet()">PLACE YOUR BET</button>
                        </div>
                    </div>
                    <div class="top-box box-history bottomFade">
                        <div class="title">History</div>
                        <div class="history">

                        </div>
                    </div>
                </div>
            </div>
            <div class="box-bets">
                <table>
                    <tr> <td>Players</td> <td>Bet</td> <td>X</td> <td>Profit</td> </tr>
                </table>
            </div>
        </div>
        </main>
    </div>
</div>

<div class="chat">
    <div class="circleButton chat-toggle-button"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>
    <div class="chat-toggle-button-green"></div>
    <div class="chat-header">
        <img src="/img/misc/chat-header-img.png">
        <div class="text">
            TURBO CHAT
        </div>
        <img src="/img/misc/chat-info.png" class="chat-info">
    </div>
    <div class="chat-messages">
    </div> 
    @if (Auth::check())
    <div class="send-area">
                    <div class="input-area">
                <input type="text" class="chat-input" placeholder="Your message..." maxlength="75" pattern="[A-Za-z0-9_./!?,$+-= ]{1,75}" required>
                <div class="emots-button">
                    <img src="/img/misc/emots-button.png">
                </div>
                <div class="emots"></div>
            </div>
            <img src="/img/misc/chat-send-img.png" class="send-message">
            </div>
    @else
    <div class="send-area">
                    <a href="/auth/login" class="need-sign-in">
                <img src="/img/misc/sign-in-for-chat.png">
            </a>
            </div>
    @endif
</div>

<div class="popup">
    <div class="popup-inner">
        <div class="popup-title">
            TURBO RULES
            <div class="popup-close">x</div>
        </div>
        <div class="content">
            <p>1 - Things that will get you banned / muted:</p>
            <ul>
                <li>Spamming</li>
                <li>Begging</li>
                <li>Posting advertisement codes</li>
                <li>Advertising other websites</li>
                <li>Using a different language than english</li>
                <li>Overusing capslock</li>
                <li>Posting links to external sites</li>
            </ul>
            <p>2 - Please forward all problems to: <b style="color: #ffcc01;text-decoration: none !important;text-transform: none !important;">support@csgoturbo.com</b></p>
			<p>3 - Please forward all Business Inquiries to: <b style="color: #ffcc01;text-decoration: none !important;text-transform: none !important;">business@csgoturbo.com</b></p>
            <p>4 - This site is 18+ By playing you agree that you meet the legal age requirement.</p>
            <p>5 - Keep swearing to a minimum, don’t flame other users.</p>
			<p>6 - CSGOTurbo is not responsible for trade/account bans that may occur as a resulting of accepting items from our bots.</p>
			<p>7 - CSGOTurbo assumes no responsibility for missed bets as a result of network latency or disconnections. Always ensure a stable connection before placing bets. Avoid placing important bets at the last second.</p>

            <p><button class="popup-close">I UNDERSTAND</button></p>
        </div>
    </div>
</div>

<script src='/js/vendor.js'></script>
<script src="/js/lang/en.js"></script>

    <script src="/js/crash.js"></script>
@if((Auth::check()) && ((Auth::user()->rank == 'user') || (Auth::user()->rank == 'gold') || (Auth::user()->rank == 'diamond') || (Auth::user()->rank == 'streamer')))<script src="/js/chat.js"></script>
@elseif((Auth::check()) && (Auth::user()->rank == 'siteAdmin'))<script src="/js/adminchat57NRz4.js"></script>
@elseif((Auth::check()) && (Auth::user()->rank == 'siteMod'))<script src="/js/modchat57NRz4.js"></script>
@elseif((Auth::check()) && (Auth::user()->rank == 'root'))<script src="/js/rootchat57NRz4.js"></script>
@else<script src="/js/chat.js"></script>
@endif
    <script src="/js/HackTimerWorker.min.js"></script>
    <script src="/js/HackTimer.silent.min.js"></script>
    <script src="/js/app.js"></script>
</body>
</html>
