require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name                = 'ReactNativeFBads'
  s.version             = package['version']
  s.summary             = package['description']
  s.description         = package['description']
  s.homepage            = 'https://github.com/callstack-io/react-native-fbads'
  s.license             = package['license']
  s.author              = package['author']
  s.source              = { :git => 'https://github.com/callstack-io/react-native-fbads.git', :tag => 'v'+s.version.to_s }

  s.platform              = :ios, '9.0'
  s.ios.deployment_target = '8.0'

  s.dependency 'React'
  s.dependency 'FBAudienceNetwork'
  s.pod_target_xcconfig = { 'FRAMEWORK_SEARCH_PATHS' => '${PODS_ROOT}/FBAudienceNetwork/**' }

  s.preserve_paths      = 'Readme.md', 'LICENSE', 'package.json'
  s.source_files        = 'src/ios/**/*.{h,m}'
  s.exclude_files       = 'src/android/*'
end
