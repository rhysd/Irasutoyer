require 'fileutils'
include FileUtils

ROOT = __dir__.freeze
BIN = "#{ROOT}/node_modules/.bin".freeze

def cmd_exists?(cmd)
  File.exists?(cmd) && File.executable?(cmd)
end

def ensure_cmd(cmd)
  $cmd_cache ||= []
  return true if $cmd_cache.include? cmd

  paths = ENV['PATH'].split(':').uniq
  unless paths.any?{|p| cmd_exists? "#{p}/#{cmd}" }
    raise "'#{cmd}' command doesn't exist"
  else
    $cmd_cache << cmd
  end
end

file 'node_modules' do
  ensure_cmd 'npm'
  sh 'npm install'
end

file 'typings' do
  ensure_cmd 'tsd'
  sh 'tsd install'
end

# %i() is unavailable because of version of Ruby on Travis
task :dep => [:node_modules, :typings]

task :build_browser_src => [:typings] do
  sh "#{BIN}/tsc -p #{ROOT}/browser"
end

task :build_renderer_src => [:typings] do
  mkdir_p "#{ROOT}/build/renderer"
  sh "#{BIN}/tsc -p #{ROOT}/renderer"
  sh "#{BIN}/browserify -d #{ROOT}/renderer/out/main.js -o #{ROOT}/build/renderer/index.js"
end

task :build => [:dep, :build_browser_src, :build_renderer_src]

task :run do
  sh "#{ROOT}/bin/cli.js"
end

task :default => [:build, :run]

task :lint do
  Dir['browser/**/*.ts'].each do |f|
    sh "tslint #{f}"
  end
  Dir['renderer/**/*.ts', 'renderer/**/*.tsx'].each do |f|
    sh "tslint #{f}"
  end
end
