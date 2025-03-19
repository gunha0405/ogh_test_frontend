pipeline {
    agent {
        docker {
            image 'node:18' // Node.js가 포함된 Docker 컨테이너 사용
        }
    }

    environment {
        IMAGE_NAME = 'gunha0405/k8s_front'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Git Clone') {
            steps {
                echo 'Cloning Repository'
                git branch : 'main', url: 'https://github.com/gunha0405/ogh_test_frontend'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Vue App') {
            steps {
                echo 'Building Vue App...'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    withDockerRegistry([credentialsId: 'jenkins-k8s-prac']) {
                        docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'k8s',
                                verbose: true,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'k8s/frontend-deployment.yml',
                                        remoteDirectory: '/',
                                        execCommand: '''
                                            sed -i "s/latest/$BUILD_ID/g" k8s/frontend-deployment.yml
                                        '''
                                    ),
                                    sshTransfer(
                                        execCommand: '''
                                            kubectl apply -f /home/test/k8s/frontend-deployment.yml
                                        '''
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}
