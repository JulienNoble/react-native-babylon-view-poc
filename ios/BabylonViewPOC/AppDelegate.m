/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <WebKit/WKWebsiteDataStore.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"BabylonViewPOC"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [self createCopyOfEngineIfNeeded];
  return YES;
}

- (void)createCopyOfEngineIfNeeded {
  // clear webview cache, important for development. Can be removed when deploying for prod
  NSSet *websiteDataTypes = [WKWebsiteDataStore allWebsiteDataTypes];
  NSDate *dateFrom = [NSDate dateWithTimeIntervalSince1970:0];
  [[WKWebsiteDataStore defaultDataStore] removeDataOfTypes:websiteDataTypes modifiedSince:dateFrom completionHandler:^{
  }];
  
  // copy folder
  BOOL success;
  NSFileManager *fileManager = [NSFileManager defaultManager];
  NSError *error;
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsDirectory = [paths objectAtIndex:0];
  NSString *enginePath = [documentsDirectory stringByAppendingPathComponent:@"/engine"]; // I copy it to an "engine" subfolder inside the app documents
  
  if ([fileManager fileExistsAtPath:enginePath])
    [fileManager removeItemAtPath:enginePath error:&error];
  
  NSString *defaultEnginePath = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:@"/engine"]; // and it's in an "engine" folder in my xcode project
  success = [fileManager copyItemAtPath:defaultEnginePath toPath:enginePath error:&error];
  NSAssert(success, @"Failed to create 3d engine files with message '%@'.", [error localizedDescription]);
}

@end
