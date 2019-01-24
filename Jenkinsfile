pipeline {
  agent {
    docker {
      image "node:8.12.0-stretch"
      args "--name restaurantetic-gui --network restaurantetic -p 4000:4000 "
    }
  }
  stages {
    stage ("Build") {
      steps {
        sh "npm install @angular/cli@6.1.3"
        sh "npm install"
      }
    }
    stage ("Run") {
      steps {
        sh "npm run build:ssr"
        sh "npm run serve:ssr"
      }
    }
  }
}