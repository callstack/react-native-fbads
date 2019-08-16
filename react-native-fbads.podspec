require 'json'
package = JSON.parse(File.read(File.join(__dir__, './', 'package.json')))

Pod::Spec.new do |s|
  s.name          = package['name']
  s.version       = package['version']
  s.summary       = package['description']
  # s.requires_arc  = true
  s.author        = { 'abhaynpai' => 'abhaypai2611@gmail.com' }
  s.license       = package['license']
  s.homepage      = package['homepage']
  s.source        = { :git => 'https://github.com/callstack/react-native-fbads', :tag => "v#{package['version']}" }
  s.platform      = :ios, '7.0'
  s.dependency      'React'
  s.dependency      'FBAudienceNetwork', '~> 5.1.0'

  s.source_files  = 'ios/**/*.{h,m}'
end