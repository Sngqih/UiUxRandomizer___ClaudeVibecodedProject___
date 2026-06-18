// A curated pool of Lucide icons. The generator samples a subset for each
// theme; the preview and inspector render them with the theme's stroke width.
import {
  Home, Search, Settings, User, Bell, Heart, Star, Bookmark,
  Calendar, Clock, Mail, MessageCircle, Phone, Camera, Image, Video,
  Music, Headphones, Mic, Map, MapPin, Compass, Globe, Cloud,
  Sun, Moon, Zap, Flame, Droplet, Leaf, Coffee, Gift,
  ShoppingCart, ShoppingBag, CreditCard, Wallet, Tag, Package, Truck, Box,
  File, Folder, Download, Upload, Share2, Link, Paperclip, Clipboard,
  Edit, Trash2, Save, Lock, Unlock, Key, Shield, Eye,
  Play, Pause, SkipForward, Volume2, Wifi, Battery, Bluetooth, Cpu,
  Code, Terminal, Database, Server, GitBranch, GitPullRequest, PenTool, Layers,
  Plus, Check, X, ChevronRight, ArrowRight, ArrowUpRight, MoreHorizontal, Filter,
  Layout, LayoutGrid, BarChart3, PieChart, TrendingUp, Activity, Target, Award,
  Users, Smile, ThumbsUp, Flag, Rocket, Sparkles, Crown, Diamond,
} from 'lucide-react';

export const ICON_POOL = [
  { name: 'Home', Comp: Home }, { name: 'Search', Comp: Search }, { name: 'Settings', Comp: Settings },
  { name: 'User', Comp: User }, { name: 'Bell', Comp: Bell }, { name: 'Heart', Comp: Heart },
  { name: 'Star', Comp: Star }, { name: 'Bookmark', Comp: Bookmark }, { name: 'Calendar', Comp: Calendar },
  { name: 'Clock', Comp: Clock }, { name: 'Mail', Comp: Mail }, { name: 'MessageCircle', Comp: MessageCircle },
  { name: 'Phone', Comp: Phone }, { name: 'Camera', Comp: Camera }, { name: 'Image', Comp: Image },
  { name: 'Video', Comp: Video }, { name: 'Music', Comp: Music }, { name: 'Headphones', Comp: Headphones },
  { name: 'Mic', Comp: Mic }, { name: 'Map', Comp: Map }, { name: 'MapPin', Comp: MapPin },
  { name: 'Compass', Comp: Compass }, { name: 'Globe', Comp: Globe }, { name: 'Cloud', Comp: Cloud },
  { name: 'Sun', Comp: Sun }, { name: 'Moon', Comp: Moon }, { name: 'Zap', Comp: Zap },
  { name: 'Flame', Comp: Flame }, { name: 'Droplet', Comp: Droplet }, { name: 'Leaf', Comp: Leaf },
  { name: 'Coffee', Comp: Coffee }, { name: 'Gift', Comp: Gift }, { name: 'ShoppingCart', Comp: ShoppingCart },
  { name: 'ShoppingBag', Comp: ShoppingBag }, { name: 'CreditCard', Comp: CreditCard }, { name: 'Wallet', Comp: Wallet },
  { name: 'Tag', Comp: Tag }, { name: 'Package', Comp: Package }, { name: 'Truck', Comp: Truck },
  { name: 'Box', Comp: Box }, { name: 'File', Comp: File }, { name: 'Folder', Comp: Folder },
  { name: 'Download', Comp: Download }, { name: 'Upload', Comp: Upload }, { name: 'Share2', Comp: Share2 },
  { name: 'Link', Comp: Link }, { name: 'Paperclip', Comp: Paperclip }, { name: 'Clipboard', Comp: Clipboard },
  { name: 'Edit', Comp: Edit }, { name: 'Trash2', Comp: Trash2 }, { name: 'Save', Comp: Save },
  { name: 'Lock', Comp: Lock }, { name: 'Unlock', Comp: Unlock }, { name: 'Key', Comp: Key },
  { name: 'Shield', Comp: Shield }, { name: 'Eye', Comp: Eye }, { name: 'Play', Comp: Play },
  { name: 'Pause', Comp: Pause }, { name: 'SkipForward', Comp: SkipForward }, { name: 'Volume2', Comp: Volume2 },
  { name: 'Wifi', Comp: Wifi }, { name: 'Battery', Comp: Battery }, { name: 'Bluetooth', Comp: Bluetooth },
  { name: 'Cpu', Comp: Cpu }, { name: 'Code', Comp: Code }, { name: 'Terminal', Comp: Terminal },
  { name: 'Database', Comp: Database }, { name: 'Server', Comp: Server }, { name: 'GitBranch', Comp: GitBranch },
  { name: 'GitPullRequest', Comp: GitPullRequest }, { name: 'PenTool', Comp: PenTool }, { name: 'Layers', Comp: Layers },
  { name: 'Plus', Comp: Plus }, { name: 'Check', Comp: Check }, { name: 'X', Comp: X },
  { name: 'ChevronRight', Comp: ChevronRight }, { name: 'ArrowRight', Comp: ArrowRight }, { name: 'ArrowUpRight', Comp: ArrowUpRight },
  { name: 'MoreHorizontal', Comp: MoreHorizontal }, { name: 'Filter', Comp: Filter }, { name: 'Layout', Comp: Layout },
  { name: 'LayoutGrid', Comp: LayoutGrid }, { name: 'BarChart3', Comp: BarChart3 }, { name: 'PieChart', Comp: PieChart },
  { name: 'TrendingUp', Comp: TrendingUp }, { name: 'Activity', Comp: Activity }, { name: 'Target', Comp: Target },
  { name: 'Award', Comp: Award }, { name: 'Users', Comp: Users }, { name: 'Smile', Comp: Smile },
  { name: 'ThumbsUp', Comp: ThumbsUp }, { name: 'Flag', Comp: Flag }, { name: 'Rocket', Comp: Rocket },
  { name: 'Sparkles', Comp: Sparkles }, { name: 'Crown', Comp: Crown }, { name: 'Diamond', Comp: Diamond },
];

const BY_NAME = Object.fromEntries(ICON_POOL.map((i) => [i.name, i.Comp]));

export function iconByName(name) {
  return BY_NAME[name];
}
