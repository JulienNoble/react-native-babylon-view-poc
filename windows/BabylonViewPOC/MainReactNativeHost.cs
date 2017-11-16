using ReactNative;
using ReactNative.Modules.Core;
using ReactNative.Shell;
using System.Collections.Generic;
using FPStaticServer;
using RNFS;

namespace BabylonViewPOC
{
    class MainReactNativeHost : ReactNativeHost
    {
        public override string MainComponentName => "BabylonViewPOC";

#if !BUNDLE || DEBUG
        public override bool UseDeveloperSupport => true;
#else
        public override bool UseDeveloperSupport => false;
#endif

        protected override string JavaScriptMainModuleName => "index";

#if BUNDLE
        protected override string JavaScriptBundleFile => "ms-appx:///ReactAssets/index.windows.bundle";
#endif

        protected override List<IReactPackage> Packages => new List<IReactPackage>
        {
            new MainReactPackage(),
            new FPStaticServerReactPackage(),
            new RNFSPackage(),
        };
    }
}
