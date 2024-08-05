<template>
  <a-config-provider
    :locale="locale === 'en' ? enUS : zhCN"
    :theme="{
      token: {
        colorPrimary: theme === 'dark' ? '#5468ff' : '#646cff'
      },
      algorithm: theme === 'dark' ? anttheme.darkAlgorithm : anttheme.defaultAlgorithm
    }"
  >
    <a-layout>
      <a-layout-header
        :style="{
          position: 'fixed',
          zIndex: 10,
          width: '100%',
          paddingLeft: '24px',
          backgroundColor: theme === 'dark' ? '#232324' : '#fff',
          borderBottom: '1px solid var(--h-switch-bg-light)'
        }"
        :theme="theme"
      >
        <a-row type="flex" align="center" justify="space-between">
          <a-col>
            <a
              v-if="!['login'].includes(route.name)"
              href="/#/"
              class="logo flex"
              :class="state.collapsed ? 'collapsed' : ''"
            >
              <svg
                class="logo-icon"
                width="64px"
                height="64px"
                viewBox="0 0 64 64"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g id="logo-page" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g
                    id="chunqiuge"
                    transform="translate(-37.000000, -395.000000)"
                    fill="currentColor"
                    fill-rule="nonzero"
                  >
                    <g id="logo" transform="translate(37.000000, 395.000000)">
                      <g id="CQG" transform="translate(0.000000, 16.500000)">
                        <path
                          d="M29.7028737,8.05088159 C28.8489924,7.48162733 28.0154415,6.97336461 27.2022211,6.52609341 C26.3890008,6.07882221 25.5554499,5.68237728 24.7015685,5.33675863 C23.8476871,4.99113997 22.922649,4.66585183 21.926454,4.36089419 C20.9302591,4.05593656 19.8222463,3.74081367 18.6024158,3.41552552 C17.1386191,4.14742385 15.7256488,5.24527134 14.3635047,6.70906799 C13.0013605,8.17286464 11.8018605,9.75864435 10.7650045,11.4664071 C9.72814859,13.1741699 8.89459771,14.9022631 8.26435193,16.6506869 C7.63410615,18.3991107 7.31898326,19.9238989 7.31898326,21.2250515 C7.31898326,21.6723227 7.53245361,22.2110812 7.9593943,22.8413269 C8.38633499,23.4715727 8.94542399,24.081488 9.6366613,24.6710727 C10.3278986,25.2606575 11.141119,25.7689202 12.0763224,26.1958609 C13.0115258,26.6228016 13.9670597,26.836272 14.9429242,26.836272 C16.1627547,26.836272 17.8298564,26.4804881 19.9442294,25.7689202 C22.0586023,25.0573524 24.2746278,24.1119837 26.5923059,22.9328142 L27.5681703,24.5795855 C26.3483397,25.3114838 25.0268567,26.0332169 23.603721,26.7447847 C22.1805854,27.4563525 20.7472845,28.0967635 19.3038184,28.6660178 C17.8603522,29.235272 16.4677123,29.6927085 15.1258987,30.0383271 C13.7840851,30.3839458 12.5845851,30.5567551 11.5273986,30.5567551 C10.022941,30.5567551 8.57947482,30.2416322 7.19700021,29.6113864 C5.81452559,28.9811407 4.58452979,28.1780856 3.50701281,27.2022211 C2.42949583,26.2263567 1.57561445,25.1285092 0.945368671,23.9086787 C0.31512289,22.6888481 3.94761461e-15,21.4893481 3.94761461e-15,20.3101786 C3.94761461e-15,18.4804327 0.508262727,16.3863903 1.52478818,14.0280513 C2.54131363,11.6697122 4.02544079,9.45368671 5.97716966,7.37997479 C7.92889853,5.30626287 10.3380639,3.55783909 13.2046656,2.13470345 C16.0712674,0.711567817 19.3749751,0 23.1157888,0 C24.4169414,0 25.9518948,0.355783909 27.7206491,1.06735173 C29.4894034,1.77891954 31.471628,2.86660178 33.667323,4.33039843 L29.7028737,8.05088159 Z"
                          id="C"
                        ></path>
                        <path
                          d="M19.3526116,18.4213581 C19.1634507,18.2321972 18.9924784,18.0284855 18.8396946,17.810223 C18.6869108,17.5919604 18.5304894,17.3591471 18.3704302,17.1117829 L18.7414765,16.7407366 C18.9888407,16.9444483 19.2252918,17.1299714 19.4508297,17.297306 C19.6763677,17.4646406 19.9055433,17.6210621 20.1383567,17.7665705 C20.8076952,17.184537 21.3569892,16.5697642 21.7862389,15.922252 C22.2154885,15.2747399 22.4301133,14.5944883 22.4301133,13.8814973 C22.4301133,13.6195823 22.4155625,13.3794935 22.3864608,13.161231 C22.3573592,12.9429684 22.3064312,12.7247059 22.2336771,12.5064433 C22.1609229,12.2881808 22.0627047,12.0553674 21.9390226,11.8080032 C21.8153405,11.560639 21.6516436,11.2768977 21.4479319,10.9567793 L20.7931443,11.0440844 C19.9200942,11.4806094 19.1925524,11.9389608 18.610519,12.4191383 C18.0284855,12.8993159 17.5555834,13.4195083 17.1918125,13.9797155 C16.8280416,14.5399226 16.5697642,15.1437823 16.4169805,15.7912945 C16.2641967,16.4388067 16.1878048,17.14816 16.1878048,17.9193543 C16.1878048,18.0212101 16.2023556,18.1194282 16.2314573,18.2140087 C16.260559,18.3085891 16.3260377,18.4213581 16.4278936,18.5523156 C16.5297494,18.6832731 16.6679824,18.8360569 16.8425924,19.0106669 C17.0172024,19.185277 17.2500158,19.4035395 17.5410325,19.6654545 C17.8466001,19.4617428 18.1521676,19.2580311 18.4577352,19.0543194 C18.7633027,18.8506077 19.0615949,18.6396206 19.3526116,18.4213581 Z M22.059067,18.5304894 C22.4810413,18.6323452 22.9248418,18.697824 23.3904685,18.7269256 C23.8560952,18.7560273 24.3653745,18.7560273 24.9183063,18.7269256 C25.0638146,18.7123748 25.1474819,18.7378388 25.1693082,18.8033175 C25.1911344,18.8687963 25.1438442,18.959739 25.0274375,19.0761457 C24.4308533,19.6436283 23.8924723,20.0656025 23.4122948,20.3420684 C22.9030155,20.2838651 22.4264756,20.1892846 21.9826751,20.0583271 C21.5388747,19.9273696 21.1059873,19.7382087 20.684013,19.4908445 C20.0292254,19.8837171 19.4180903,20.1929223 18.8506077,20.4184603 C18.2831251,20.6439983 17.8174984,20.7567672 17.4537275,20.7567672 C17.1627108,20.7567672 16.7880268,20.6367228 16.3296754,20.396634 C15.8713241,20.1565453 15.4311613,19.84734 15.0091871,19.4690183 C14.5872129,19.0906965 14.223442,18.6759977 13.9178744,18.2249218 C13.6123069,17.7738459 13.4595231,17.3373208 13.4595231,16.9153466 C13.4595231,16.260559 13.6013937,15.5839451 13.885135,14.885505 C14.1688763,14.1870649 14.5690243,13.5177264 15.085579,12.8774897 C15.6021337,12.2372529 16.209631,11.6515817 16.9080712,11.1204762 C17.6065113,10.5893707 18.3704302,10.1564834 19.1998278,9.82181415 L20.9241018,10.498428 C21.5352369,10.3674705 22.0190522,10.2656146 22.3755477,10.1928605 C22.7320432,10.1201063 23.0085091,10.0655406 23.2049453,10.0291636 C23.4013816,9.99278647 23.5359769,9.97096021 23.608731,9.96368479 C23.6814852,9.95640938 23.7396886,9.95277167 23.7833411,9.95277167 C23.9142986,9.95277167 24.0670824,10.0255258 24.2416924,10.1710342 C24.4163024,10.3165426 24.5872747,10.5275297 24.7546094,10.8039956 C24.921944,11.0804614 25.0638146,11.4151307 25.1802213,11.8080032 C25.296628,12.2008758 25.3548313,12.6374009 25.3548313,13.1175784 C25.3548313,13.6414085 25.2675263,14.1506878 25.0929163,14.6454162 C24.9183063,15.1401446 24.6782175,15.6166845 24.3726499,16.0750358 C24.0670824,16.5333871 23.7142246,16.9699122 23.3140766,17.384611 C22.9139286,17.7993099 22.4955921,18.1812693 22.059067,18.5304894 Z"
                          id="Q"
                        ></path>
                        <path
                          d="M63.3973027,15.0071638 C61.9910089,15.6500409 60.6349399,16.1321988 59.3290956,16.4536374 C58.0232514,16.775076 56.6671824,17.0362448 55.2608886,17.2371439 L58.6359937,18.804157 C57.9529367,19.4068543 57.3703293,20.0296416 56.8881714,20.6725188 C56.4060135,21.3153959 56.0042153,22.0386327 55.6827767,22.8422292 C55.3613381,23.6458256 55.0901243,24.5498716 54.8691353,25.5543672 C54.6481463,26.5588628 54.477382,27.7441675 54.3568426,29.1102815 L47.6066324,30.5567551 C47.8075315,29.4718999 48.0586554,28.4774493 48.360004,27.5734033 C48.6613527,26.6693573 49.1133757,25.6949966 49.7160731,24.6503212 C48.3499591,25.4940975 47.1345194,26.2374242 46.0697541,26.8803013 C45.0049888,27.5231785 44.0105382,28.0656061 43.0864023,28.5075842 C42.1622664,28.9495622 41.2984002,29.2810458 40.4948038,29.5020348 C39.6912073,29.7230238 38.8876108,29.8335183 38.0840144,29.8335183 C37.039339,29.8335183 36.0047086,29.4919898 34.9801231,28.8089328 C33.9555376,28.1258759 33.0414467,27.3222794 32.2378502,26.3981435 C31.4342537,25.4740076 30.7712867,24.5096918 30.248949,23.5051962 C29.7266113,22.5007007 29.4654424,21.6569244 29.4654424,20.9738674 C29.4654424,20.0899113 29.6362067,19.0753708 29.9777352,17.9302459 C30.3192637,16.7851209 30.7411518,15.639996 31.2433996,14.494871 C31.7456474,13.3497461 32.3081649,12.2648909 32.9309521,11.2403054 C33.5537394,10.2157199 34.1463918,9.38198859 34.7089093,8.73911143 C37.2000583,5.6854449 39.7916569,3.4655097 42.483705,2.07930582 C45.1757531,0.693101941 48.3097793,0 51.8857835,0 C52.8099194,0 53.7641902,0.130584424 54.7485958,0.391753271 C55.7330015,0.652922118 56.7073622,1.00449557 57.6716779,1.44647362 C58.6359937,1.88845166 59.5701746,2.4007444 60.4742206,2.98335183 C61.3782666,3.56595926 62.2119979,4.17870155 62.9754145,4.82157872 L58.2743753,8.13641409 C56.8279017,7.13191852 55.3211583,6.27809729 53.7541452,5.57495039 C52.1871321,4.8718035 50.2785906,4.19879147 48.0285205,3.5559143 C46.9838451,4.15861164 45.8789,5.07270261 44.7136851,6.2981872 C43.5484703,7.52367179 42.4334802,8.91992063 41.3687149,10.4869337 C40.3039496,12.0539468 39.3496788,13.7414993 38.5059025,15.5495914 C37.6621263,17.3576834 37.0192491,19.1657754 36.577271,20.9738674 C36.6978105,21.4560253 36.9288445,21.978363 37.270373,22.5408805 C37.6119015,23.103398 38.0237447,23.6257357 38.5059025,24.1078936 C38.9880604,24.5900515 39.4903082,24.9918497 40.0126459,25.3132883 C40.5349836,25.6347268 41.0372314,25.7954461 41.5193892,25.7954461 C42.1622664,25.7954461 43.0663124,25.5543672 44.2315273,25.0722093 C45.3967421,24.5900515 46.5820469,23.9672642 47.7874416,23.2038476 C48.9928362,22.4404309 50.0877364,21.5665198 51.0721421,20.5821141 C52.0565477,19.5977085 52.6893799,18.583168 52.9706387,17.5384926 C50.5598493,17.8599312 48.5207233,17.9804706 46.8532607,17.900111 C45.185798,17.8197513 44.0507181,17.6590321 43.4480207,17.4179531 L46.5820469,13.3196112 C48.9124766,13.7615893 51.5542999,13.9122636 54.5075169,13.7716342 C57.4607339,13.6310048 60.6248949,13.1990717 64,12.4758349 L63.3973027,15.0071638 Z"
                          id="G"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <span class="logo-text">春秋阁</span>
            </a>
          </a-col>
          <a-col class="flex center">
            <a-dropdown placement="bottomRight" v-if="userInfo.id">
              <button class="button">
                <a-avatar size="small" :src="userInfo.avatar">
                  <template #icon>
                    <UserOutlined />
                  </template>
                </a-avatar>
                <span style="margin-left: 2px">{{ userInfo.name }}</span>
              </button>
              <template #overlay>
                <a-menu>
                  <a-menu-item class="locale-menu-item">
                    <router-link class="locale-item" to="/account/settings">个人中心</router-link>
                  </a-menu-item>
                  <a-menu-item class="locale-menu-item">
                    <a class="locale-item" href="javascript:;" @click="logout">退出登录</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <button class="button switch" :class="theme" @click="changeTheme(theme === 'light')">
              <span class="check">
                <span class="icon">
                  <!--[-->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    class="sun"
                  >
                    <path
                      d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"
                    ></path>
                    <path
                      d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"
                    ></path>
                    <path
                      d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"
                    ></path>
                    <path
                      d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"
                    ></path>
                    <path
                      d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"
                    ></path>
                    <path
                      d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"
                    ></path>
                    <path
                      d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                    ></path>
                    <path
                      d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"
                    ></path>
                    <path
                      d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    class="moon"
                  >
                    <path
                      d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"
                    ></path>
                  </svg>
                  <!--]-->
                </span>
              </span>
            </button>
            <a-dropdown placement="bottomRight">
              <button class="button">
                <span class="text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    class="option-icon"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    class="text-icon"
                  >
                    <path
                      d="M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z"
                    ></path>
                  </svg>
                </span>
              </button>
              <template #overlay>
                <a-menu>
                  <a-menu-item class="locale-menu-item" :class="{ active: locale === 'en' }">
                    <a
                      class="locale-item"
                      :class="{ active: locale === 'en' }"
                      href="javascript:;"
                      @click="changeLanguage(enUS.locale)"
                    >
                      English
                    </a>
                  </a-menu-item>
                  <a-menu-item class="locale-menu-item" :class="{ active: locale === 'zh-cn' }">
                    <a
                      class="locale-item"
                      @click="changeLanguage(zhCN.locale)"
                      :class="{ active: locale === 'zh-cn' }"
                      href="javascript:;"
                    >
                      简体中文
                    </a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout :style="{ marginTop: !['login'].includes(route.name) ? '64px' : '0' }">
        <a-layout-sider
          v-if="!showSliderNames.includes(route.name)"
          :theme="theme"
          breakpoint="lg"
          collapsed-width="80"
          @collapse="onCollapse"
          @breakpoint="onBreakpoint"
          v-model:collapsed="state.collapsed"
          collapsible
          :style="{
            overflow: 'auto',
            height: 'calc(100vh - 64px)',
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0
          }"
        >
          <a-menu
            v-model:selectedKeys="state.selectedKeys"
            v-model:openKeys="state.openKeys"
            @openChange="onOpenChange"
            :theme="theme"
            mode="inline"
          >
            <template v-for="item in menuOptions" :key="item.key">
              <template v-if="!item.children">
                <a-menu-item :key="item.key">
                  <template #icon v-if="item.icon">
                    <Icon v-if="typeof item.icon === 'string'" :icon="item.icon" />
                    <component v-else :is="item.icon" />
                  </template>
                  {{ item.title }}
                </a-menu-item>
              </template>
              <template v-else>
                <sub-menu :key="item.key" :menu-info="item"></sub-menu>
              </template>
            </template>
          </a-menu>
        </a-layout-sider>
        <a-layout
          :style="{
            marginLeft: !showSliderNames.includes(route.name)
              ? state.collapsed
                ? '80px'
                : '200px'
              : 0
          }"
        >
          <a-layout-content>
            <!-- 内容区域 -->
            <tags v-if="!showSliderNames.includes(route.name)"></tags>
            <div
              :class="[
                'app-content',
                !showSliderNames.includes(route.name) ? ' ml10 mr10 mb10' : ''
              ]"
              :style="{ 'min-height': 'calc(100vh - 116px)' }"
              flex
              flex-col
            >
              <router-view v-slot="{ Component, route }">
                <keep-alive v-if="route.meta.keepAlive">
                  <component :is="Component" />
                </keep-alive>
                <component :is="Component" v-else />
              </router-view>
            </div>
          </a-layout-content>
          <a-layout-footer style="text-align: center">春秋阁 ©{{ state.year }}</a-layout-footer>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script setup>
defineOptions({
  name: 'LayoutIndex'
})
import 'dayjs/locale/zh-cn'

import { UserOutlined } from '@ant-design/icons-vue'
import { theme as anttheme } from 'ant-design-vue'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import Icon from 'components/Icon/index.vue'
import SubMenu from 'components/submenu/index.vue'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import useStore from 'store'
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { routers } from '@/router/modules/default'

import Tags from './tags.vue'
const showSliderNames = ['login', 'noAccess']
const { common, user } = useStore()
const { locale, i18nLocal, theme } = storeToRefs(common)
const { userInfo } = storeToRefs(user)
const router = useRouter()
const route = useRoute()
const i18n = useI18n({ useScope: 'global' })
const defaultRoute = route.name ? route.name : 'analysis'
dayjs.locale(locale)
i18n.locale.value = i18nLocal.value
// const theme = ref('light')
// const selectedKeys = ref(['dashboard:analysis'])
const state = reactive({
  selectedKeys: ['dashboard:analysis'],
  openKeys: ['dashboard:analysis'],
  preOpenKeys: ['dashboard:analysis'],
  collapsed: false,
  year: new Date().getFullYear()
})
// const setDefaultMenu = () => {
//   const defaultKey = 'dashboard:analysis'
//   const defaultTitle = i18n.t(`menu.${defaultKey}`)
//   if (route.meta.key !== defaultKey) {
//     user.addOpenRouteList(
//       {
//         path: '/dashboard/analysis',
//         name: 'analysis',
//         key: 'dashboard:analysis',
//         meta: {
//           key: 'dashboard:analysis',
//           requiresAuth: false, // 是否授权
//           keepAlive: true // 是否缓存
//         }
//       },
//       defaultTitle
//     )
//   }
// }
// setDefaultMenu()
watch(locale, (val) => {
  console.log('val', val)
  dayjs.locale(val)
})
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal
  }
)
watch(
  () => route.path,
  () => {
    if (!route.meta.notTag) {
      const title = i18n.t(`menu.${route.meta.key}`)
      user.addOpenRouteList(route, title)
      state.openKeys = route.meta.key.split(':')
      state.selectedKeys = [route.meta.key]
    }
  },
  {
    immediate: true
  }
)
// 监听hash变化
window.addEventListener(
  'hashchange',
  () => {
    if (!window.location.hash.includes('login')) {
      let currentKey = window.location.hash.slice(2).replace(/\//g, ':').split('?')[0]
      state.openKeys = currentKey.split(':')
      state.selectedKeys = [currentKey]
    }
  },
  false
)
// 退出登录
const logout = () => {
  user.logout()
  router.push({
    name: 'login'
  })
}
const onCollapse = (collapsed) => {
  state.openKeys = collapsed ? [] : state.preOpenKeys
  state.collapsed = collapsed
}

const onBreakpoint = (broken) => {
  console.log('缩小', broken)
}
const onOpenChange = (openKeys) => {
  state.openKeys = openKeys.length ? [openKeys[openKeys.length - 1]] : []
}
// 设置路由
const getTree = (list) => {
  let arr = []
  if (list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      let opt = {}
      const item = list[i]
      if (item.path === '/') {
        return getTree(item.children)
      }
      if (item.name === defaultRoute) {
        const keys = item.meta.key.split(':')
        state.selectedKeys = [item.meta.key]
        state.openKeys = keys
      }
      const hasPermission = user.permissions.some((permission) => permission.key === item.meta.key)
      if (item.meta && !item.meta.notMenu && item.meta.key && hasPermission) {
        opt = {
          title: i18n.t(`menu.${item.meta.key}`),
          key: item.meta.key,
          icon: item.meta.icon ? item.meta.icon : null,
          path: item.path,
          name: item.name
        }
      }
      if (
        !item.meta.notMenu &&
        item.children !== null &&
        item.children &&
        item.children.length > 0
      ) {
        opt.children = getTree(item.children)
      }
      if (Object.keys(opt).length) {
        arr.push(opt)
      }
    }
  }
  return arr
}
let menuList = getTree(routers)
const menuOptions = ref(menuList)
/**
 * @description 刷新页面获取权限
 */
const getUserInfo = () => {
  console.log('获取权限')
  if (user.token) {
    user.getUserInfo()
  }
}
getUserInfo()

// 切换主题
const changeTheme = (checked) => {
  changeRootClassName(checked)
}
const changeRootClassName = (dark = false) => {
  if (dark) {
    document.documentElement.classList.add('dark')
    // localStorage.setItem('localTheme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  console.log('===', dark)
  common.changeTheme(dark ? 'dark' : 'light')
  // document.documentElement.setAttribute('data-doc-theme', dark ? 'dark' : 'light')
  document.documentElement.setAttribute('style', `color-scheme: ${dark ? 'dark' : 'light'}`)
}
// 更改语言
const changeLanguage = (val) => {
  common.changeLocal(val)
  if (val === 'zh-cn') {
    i18n.locale.value = 'zh-CN'
  } else {
    i18n.locale.value = 'en-US'
  }
  location.reload()
}

// 监听系统主题
const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
// const localTheme = localStorage.getItem('localTheme')
console.log('theme.value', theme.value)
if (theme.value) {
  changeRootClassName(theme.value === 'dark')
} else {
  changeRootClassName(themeMedia.matches)
}
themeMedia.addEventListener('change', (e) => {
  theme.value = e.matches ? 'dark' : 'light'
  changeRootClassName(e.matches)
})
</script>

<style lang="less" scoped>
.ant-layout {
  min-height: 100%;
}
.logo {
  overflow: hidden;
  cursor: pointer;
  color: var(--a-color);
  &:hover {
    color: var(--a-color);
  }
  .logo-icon {
    color: var(--primary-color);
    width: 40px;
  }
  &.collapsed {
    .logo-text {
      width: 0;
      margin-left: 0;
      opacity: 0;
    }
  }
}
.logo-text {
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  white-space: nowrap;
  transition: all linear 0.3s;
  color: var(--nav-color);
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

// [data-theme='dark'] .site-layout-sub-header-background {
//   background: #141414;
// }
.text {
  display: flex;
  align-items: center;
  // padding: 0 12px;
  height: var(--nav-height-mobile);
  color: var(--nav-color);
  transition: color 0.5s;
  &-icon {
    margin-left: 4px;
    width: 14px;
    height: 14px;
    fill: currentColor;
  }
}
.avatar {
  display: flex;
  align-items: center;
  height: var(--nav-height-mobile);
  color: var(--nav-color);
  transition: color 0.5s;
  &-icon {
    margin-left: 4px;
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
  &-img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
}
.option-icon {
  margin-right: 0;
  width: 16px;
  height: 16px;
  fill: currentColor;
}
.header-row {
  color: #fff;
}
.button {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: var(--nav-height-mobile);
  color: var(--text-dark-1);
  transition: color 0.5s;
}
.switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  transition:
    border-color 0.25s,
    background-color 0.25s;
  border: 1px solid var(--h-switch-br-light);
  background-color: var(--h-switch-bg-light);
  &:hover {
    border-color: var(--h-switch-br-h-light);
  }
  .check {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transition:
      background-color 0.25s,
      transform 0.25s;
    background-color: var(--h-switch-c-bg-light);
    box-shadow: var(--h-shadow-light);
    .icon {
      position: relative;
      display: block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      overflow: hidden;
      pointer-events: auto;
      svg {
        transition: opacity 0.25s;
        position: absolute;
        top: 3px;
        left: 3px;
        width: 12px;
        height: 12px;
        fill: var(--h-switch-svg-light);
      }
      .sun {
        opacity: 1;
      }
      .moon {
        opacity: 0;
      }
    }
  }
  &.light {
    .check {
      svg {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 12px;
        height: 12px;
      }
    }
  }

  &.dark {
    .check {
      transform: translate(18px);
      .icon {
        .sun {
          opacity: 0;
        }
        .moon {
          opacity: 1;
        }
      }
    }
  }
}
.ant-layout-sider-dark,
.ant-layout-sider-light {
  background: var(--h-switch-c-bg-light);
  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    background: var(--h-switch-bg-light);
  }
}
:deep(.ant-layout-sider-trigger) {
  background: var(--h-switch-c-bg-light);
}
:deep(.locale-menu-item) {
  transition: all linear 0.15s;
  &.active {
    background-color: var(--h-a-active-bg);
  }
}
.locale-item {
  text-align: center;
  cursor: pointer;
  padding: 5px;
  transition: all linear 0.15s;
  &:hover,
  &.active {
    color: var(--a-hover);
  }
}
.theme-light :deep(.ant-layout-sider-trigger) {
  background-color: var(--h-switch-c-bg-light);
}
</style>
