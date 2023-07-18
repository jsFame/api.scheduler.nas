'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">api.scheduler.nas documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-332e7b33d75d031bad39280dc0ec390fe53d05c6b4031767bef33bf093f1ebe3671389a3c9f90c1456941011d178aefb4443bd182d07b0fce0fb9506dbadc955"' : 'data-bs-target="#xs-controllers-links-module-AppModule-332e7b33d75d031bad39280dc0ec390fe53d05c6b4031767bef33bf093f1ebe3671389a3c9f90c1456941011d178aefb4443bd182d07b0fce0fb9506dbadc955"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-332e7b33d75d031bad39280dc0ec390fe53d05c6b4031767bef33bf093f1ebe3671389a3c9f90c1456941011d178aefb4443bd182d07b0fce0fb9506dbadc955"' :
                                            'id="xs-controllers-links-module-AppModule-332e7b33d75d031bad39280dc0ec390fe53d05c6b4031767bef33bf093f1ebe3671389a3c9f90c1456941011d178aefb4443bd182d07b0fce0fb9506dbadc955"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-332e7b33d75d031bad39280dc0ec390fe53d05c6b4031767bef33bf093f1ebe3671389a3c9f90c1456941011d178aefb4443bd182d07b0fce0fb9506dbadc955"' : 'data-bs-target="#xs-injectables-links-module-AppModule-332e7b33d75d031bad39280dc0ec390fe53d05c6b4031767bef33bf093f1ebe3671389a3c9f90c1456941011d178aefb4443bd182d07b0fce0fb9506dbadc955"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-332e7b33d75d031bad39280dc0ec390fe53d05c6b4031767bef33bf093f1ebe3671389a3c9f90c1456941011d178aefb4443bd182d07b0fce0fb9506dbadc955"' :
                                        'id="xs-injectables-links-module-AppModule-332e7b33d75d031bad39280dc0ec390fe53d05c6b4031767bef33bf093f1ebe3671389a3c9f90c1456941011d178aefb4443bd182d07b0fce0fb9506dbadc955"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-787ba1e301e7a352be889ed997489853b583b80a4a05c7bcce38e5c7ed81dc8fbe5e2baa946c1dc528ea07e66d16fd4c180980da9a43fcb6d0010061659dc5e2"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-787ba1e301e7a352be889ed997489853b583b80a4a05c7bcce38e5c7ed81dc8fbe5e2baa946c1dc528ea07e66d16fd4c180980da9a43fcb6d0010061659dc5e2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-787ba1e301e7a352be889ed997489853b583b80a4a05c7bcce38e5c7ed81dc8fbe5e2baa946c1dc528ea07e66d16fd4c180980da9a43fcb6d0010061659dc5e2"' :
                                            'id="xs-controllers-links-module-AuthModule-787ba1e301e7a352be889ed997489853b583b80a4a05c7bcce38e5c7ed81dc8fbe5e2baa946c1dc528ea07e66d16fd4c180980da9a43fcb6d0010061659dc5e2"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-787ba1e301e7a352be889ed997489853b583b80a4a05c7bcce38e5c7ed81dc8fbe5e2baa946c1dc528ea07e66d16fd4c180980da9a43fcb6d0010061659dc5e2"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-787ba1e301e7a352be889ed997489853b583b80a4a05c7bcce38e5c7ed81dc8fbe5e2baa946c1dc528ea07e66d16fd4c180980da9a43fcb6d0010061659dc5e2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-787ba1e301e7a352be889ed997489853b583b80a4a05c7bcce38e5c7ed81dc8fbe5e2baa946c1dc528ea07e66d16fd4c180980da9a43fcb6d0010061659dc5e2"' :
                                        'id="xs-injectables-links-module-AuthModule-787ba1e301e7a352be889ed997489853b583b80a4a05c7bcce38e5c7ed81dc8fbe5e2baa946c1dc528ea07e66d16fd4c180980da9a43fcb6d0010061659dc5e2"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-b450d622665d914bb7a48e2013c30446d3b4c970c9c681d1f192f1aa5793e66fc7639a4edd40909bac6a4ab0b1f2e4338fdab3d4184c82f8c1ffcab33ce4f6b5"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-b450d622665d914bb7a48e2013c30446d3b4c970c9c681d1f192f1aa5793e66fc7639a4edd40909bac6a4ab0b1f2e4338fdab3d4184c82f8c1ffcab33ce4f6b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-b450d622665d914bb7a48e2013c30446d3b4c970c9c681d1f192f1aa5793e66fc7639a4edd40909bac6a4ab0b1f2e4338fdab3d4184c82f8c1ffcab33ce4f6b5"' :
                                        'id="xs-injectables-links-module-PrismaModule-b450d622665d914bb7a48e2013c30446d3b4c970c9c681d1f192f1aa5793e66fc7639a4edd40909bac6a4ab0b1f2e4338fdab3d4184c82f8c1ffcab33ce4f6b5"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScheduleModule.html" data-type="entity-link" >ScheduleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ScheduleModule-2f7a8f61d3f4df51597af95296dc659c238fd79ef98ceb8ef1f4c365596a4fb2983926a468a75452f816c39b75b20d15a361fa057c97d0099c0619a8ba1e3b80"' : 'data-bs-target="#xs-controllers-links-module-ScheduleModule-2f7a8f61d3f4df51597af95296dc659c238fd79ef98ceb8ef1f4c365596a4fb2983926a468a75452f816c39b75b20d15a361fa057c97d0099c0619a8ba1e3b80"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ScheduleModule-2f7a8f61d3f4df51597af95296dc659c238fd79ef98ceb8ef1f4c365596a4fb2983926a468a75452f816c39b75b20d15a361fa057c97d0099c0619a8ba1e3b80"' :
                                            'id="xs-controllers-links-module-ScheduleModule-2f7a8f61d3f4df51597af95296dc659c238fd79ef98ceb8ef1f4c365596a4fb2983926a468a75452f816c39b75b20d15a361fa057c97d0099c0619a8ba1e3b80"' }>
                                            <li class="link">
                                                <a href="controllers/ScheduleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScheduleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ScheduleModule-2f7a8f61d3f4df51597af95296dc659c238fd79ef98ceb8ef1f4c365596a4fb2983926a468a75452f816c39b75b20d15a361fa057c97d0099c0619a8ba1e3b80"' : 'data-bs-target="#xs-injectables-links-module-ScheduleModule-2f7a8f61d3f4df51597af95296dc659c238fd79ef98ceb8ef1f4c365596a4fb2983926a468a75452f816c39b75b20d15a361fa057c97d0099c0619a8ba1e3b80"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ScheduleModule-2f7a8f61d3f4df51597af95296dc659c238fd79ef98ceb8ef1f4c365596a4fb2983926a468a75452f816c39b75b20d15a361fa057c97d0099c0619a8ba1e3b80"' :
                                        'id="xs-injectables-links-module-ScheduleModule-2f7a8f61d3f4df51597af95296dc659c238fd79ef98ceb8ef1f4c365596a4fb2983926a468a75452f816c39b75b20d15a361fa057c97d0099c0619a8ba1e3b80"' }>
                                        <li class="link">
                                            <a href="injectables/ScheduleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScheduleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-658fa9d9999a1e33304fee646a338f1ad7584464b8763811f08a32325699544692a50786a8cc68fe62153898b9a5e3f18e1b1eb01dae6cf967c2616c7d4f4cdf"' : 'data-bs-target="#xs-controllers-links-module-UserModule-658fa9d9999a1e33304fee646a338f1ad7584464b8763811f08a32325699544692a50786a8cc68fe62153898b9a5e3f18e1b1eb01dae6cf967c2616c7d4f4cdf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-658fa9d9999a1e33304fee646a338f1ad7584464b8763811f08a32325699544692a50786a8cc68fe62153898b9a5e3f18e1b1eb01dae6cf967c2616c7d4f4cdf"' :
                                            'id="xs-controllers-links-module-UserModule-658fa9d9999a1e33304fee646a338f1ad7584464b8763811f08a32325699544692a50786a8cc68fe62153898b9a5e3f18e1b1eb01dae6cf967c2616c7d4f4cdf"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-658fa9d9999a1e33304fee646a338f1ad7584464b8763811f08a32325699544692a50786a8cc68fe62153898b9a5e3f18e1b1eb01dae6cf967c2616c7d4f4cdf"' : 'data-bs-target="#xs-injectables-links-module-UserModule-658fa9d9999a1e33304fee646a338f1ad7584464b8763811f08a32325699544692a50786a8cc68fe62153898b9a5e3f18e1b1eb01dae6cf967c2616c7d4f4cdf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-658fa9d9999a1e33304fee646a338f1ad7584464b8763811f08a32325699544692a50786a8cc68fe62153898b9a5e3f18e1b1eb01dae6cf967c2616c7d4f4cdf"' :
                                        'id="xs-injectables-links-module-UserModule-658fa9d9999a1e33304fee646a338f1ad7584464b8763811f08a32325699544692a50786a8cc68fe62153898b9a5e3f18e1b1eb01dae6cf967c2616c7d4f4cdf"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthDto.html" data-type="entity-link" >AuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateScheduleDto.html" data-type="entity-link" >CreateScheduleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditUserDto.html" data-type="entity-link" >EditUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtGuard.html" data-type="entity-link" >JwtGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/Schedule.html" data-type="entity-link" >Schedule</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServiceStatus.html" data-type="entity-link" >ServiceStatus</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateScheduleDto.html" data-type="entity-link" >UpdateScheduleDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});