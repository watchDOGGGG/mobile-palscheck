import {createGlobalStyle} from 'styled-components'
export const lightTheme = {
    body:'#fcfdfd',
    fontColor:'#090b0c',
    icons: '#757575',
    newsfeed:'#fff'
}
export const darkTheme = {
    body:'#091521',
    fontColor:'#e4e6eb',
    icons: '#757575',
    newsfeed:'#0d1f31',
    
}

export const GlobalStyles = createGlobalStyle`

body{
    background-color: ${props=>props.theme.body}
}

a{
    color: ${props=>props.theme.fontColor}
}
.layout-header{
    background-color: ${props=>props.theme.body}
}
.feed-c-i{
    color: ${props=>props.theme.icons}
}
.newfeed--3-art{
    background-color: ${props=>props.theme.newsfeed}
}
.feedname{
    color: ${props=>props.theme.fontColor}
}
.palscheck-p3{
    background-color: ${props=>props.theme.body}
}
.textarea_13l{
    color: ${props=>props.theme.fontColor}
}
.ant-tabs{
    color: ${props=>props.theme.fontColor}
}
.ant-comment-content-author-name > * {
    color: ${props=>props.theme.fontColor}
}
.ant-modal-content{
    background-color: ${props=>props.theme.body}
}
.ant-modal-header{
    background-color: ${props=>props.theme.body}
}
.ant-modal-header{
    color: ${props=>props.theme.fontColor}
}
.editing_panel{
    background-color: ${props=>props.theme.body}
}
.f-name{
    color: ${props=>props.theme.fontColor}
}
.f-name2{
    color: ${props=>props.theme.fontColor}
}
`